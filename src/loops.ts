import { getCredentials } from "./service/loops-api";
import { createModal, hideModal } from "./elements/modal";

export default async function initialize(clientId: string, clientSecret: string) {

  if (!clientId || !clientSecret) {
    throw new Error("Client ID or Client Secret is not provided");
  }

  const { token, storeId, stripeAccountId } = await getCredentials(
    clientId,
    clientSecret
  );

  localStorage.setItem("loops-token", token);
  localStorage.setItem("loops-store-id", storeId);
  localStorage.setItem("loops-stripe-account-id", stripeAccountId);

  createModal();
  hideModal();
}
