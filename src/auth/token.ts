export async function getCredentials(clientId: string, clientSecret: string) {
  try {
    const response = await fetch(
      "http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com/api/v1/auth/basic",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
