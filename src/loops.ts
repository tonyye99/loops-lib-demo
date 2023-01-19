import { getCredentials } from "./auth/token";

export default async function Loops(clientId: string, clientSecret: string) {
  const { token, storeId } = await getCredentials(clientId, clientSecret);
}
