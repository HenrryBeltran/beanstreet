import { Try } from "./safeTry";

export async function getBase64(imageURL: string) {
  const { error: fetchError, result: response } = await Try(fetch(imageURL));

  if (fetchError) {
    throw new Error(`Failed to get image: ${fetchError}`);
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  return base64;
}
