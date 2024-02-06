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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/offer`, { next: { revalidate: 60 } }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to fetch main offer error.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Offer>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse main offer error.", parseError);
    return null;
  }

  return data;
};
