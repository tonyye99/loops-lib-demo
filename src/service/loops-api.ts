// const apiUrl =
//   "http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com";
const apiUrl = "http://localhost:8080";

export async function getCredentials(clientId: string, clientSecret: string) {
  if (!clientId || !clientSecret) {
    throw new Error("Client ID or Client Secret is not provided");
  }
  try {
    const response = await fetch(`${apiUrl}/api/v1/auth/basic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createStripePaymentIntent(amount: number) {
  const token = localStorage.getItem("loops-token");

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/merchant/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createLoopsSubscription(
  address: any,
  plan: any,
  email: string
) {
  const token = localStorage.getItem("loops-token");
  const merchant_id = localStorage.getItem("loops-store-id");

  let firstName, lastName;
  if (address.name.indexOf(" ") !== -1) {
    [firstName, lastName] = address.name.split(" ");
  } else {
    firstName = address.name;
    lastName = "";
  }

  const body = {
    id: "2c6e239a-f02b-d158-2833-c7f883bb5530",
    merchant_id: merchant_id.toString(),
    products_variant: [
      {
        product_type: "plan",
        id: plan.key.toString(),
        num: 1,
        option: "商品ごとのメモを管理",
      },
    ],
    customer_information: {
      address2: address.address.line2 || "",
      address1: address.address.line1 || "",
      city: address.address.city,
      pref: address.address.state,
      zipcode: address.address.postal_code,
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel: address.phone,
    },
    shipping_information: {
      address2: address.address.line2 || "",
      address1: address.address.line1 || "",
      city: address.address.city,
      pref: address.address.state,
      zipcode: address.address.postal_code,
      first_name: firstName,
      last_name: lastName,
      tel: address.phone,
    },
    options: {
      shipping: "0(通常配送) / 1(無料配送)",
      coupon: "",
      payment: "stripe",
      callback_url: "https://localhost:4000",
    },
  };

  try {
    const response = await fetch(`${apiUrl}/api/v1/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
