import { Try } from "@/utils/try";

export type Offer = {
  result: {
    name: string;
    slug: string;
    description: string;
    discount: number;
    offerType: string[];
  };
};

type GetHandler = () => Promise<Offer | null>;

export const getMainOffer: GetHandler = async () => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/offer/main`, { cache: "no-store" }),
  );

  if (!response) {
    console.log("~ RESPONSE:", JSON.stringify(response));
    console.log("~ Fetch Error: Failed to fetch main offer error.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Offer>(response.json());

  if (parseError) {
    console.log("~ DATA:", JSON.stringify(data));
    console.error("~ Server Error: Failed to parse main offer error.", parseError);
    return null;
  }

  return data;
};
