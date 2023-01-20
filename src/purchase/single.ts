import { loadStripe } from "@stripe/stripe-js";
import {
  createStripePaymentIntent,
  createLoopsSubscription,
} from "../service/loops-api";
import {
  createLinkAuthenticationElement,
  createPaymentElement,
  createAddressElement,
  removeIframes,
} from "../elements/stripe-elements";
import {
  showModal,
  hideModal,
  showButtonLoader,
  showLoader,
  hideLoader,
  showMessage,
} from "../elements/modal";

const singlePurchase = async (plan: any) => {
  if (!plan.price) {
    throw new Error("No price");
  }

  showModal();
  showLoader();

  let clientSecret = "";
  try {
    const { clientSecret: secret } = await createStripePaymentIntent(
      plan.price
    );
    clientSecret = secret;
  } catch (error) {
    throw new Error(error);
  }

  if (!clientSecret) {
    throw new Error("No client secret");
  }

  const stripeAccountId = localStorage.getItem("loops-stripe-account-id");
  const stripe = await loadStripe(
    "pk_test_51IcNIEBin9HfPevgFeVBbBTZoGKs1nxLTXk8dwwbXAChVpM7fAj5iKnnCpi7WENU6CQf9L1wGNoIgToZxvwy62PI00agu56lbs",
    {
      stripeAccount: stripeAccountId,
    }
  );

  let emailAddress = "";
  let address = {};
  const elements = stripe.elements({
    appearance: {
      theme: "stripe",
    },
    clientSecret,
  });

  const linkAuthenticationEl = createLinkAuthenticationElement(elements);
  linkAuthenticationEl.on("change", (event: any) => {
    if (event.error) {
      console.log(event.error);
    } else {
      emailAddress = event.value.email;
    }
  });
  createPaymentElement(elements);
  createAddressElement(elements);

  const cancelButtonEl = document.querySelector("#cancel");
  cancelButtonEl?.addEventListener("click", (e) => {
    e.preventDefault();
    removeIframes();
    hideModal();
  });

  hideLoader();

  const form = document.getElementById("payment-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showButtonLoader(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });
    if (error) {
      if (error?.type === "card_error" || error?.type === "validation_error") {
        showMessage(error.message);
      } else {
        showMessage("An unexpected error occurred.");
      }
    } else {
      const addressElement = elements.getElement("address") as any;
      const { complete, value } = await addressElement.getValue();
      if (complete) {
        address = value;
      }
      try {
        const { status } = await createLoopsSubscription(
          address,
          plan,
          emailAddress
        );
        if (status === "success") {
          showMessage("Subscription created successfully");
        }
      } catch (error) {
        showMessage("An unexpected error occurred.");
      } finally {
        showButtonLoader(false);
        removeIframes();
        hideModal();
      }
    }
  });
};

export { singlePurchase };
