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
    fetch(`${process.env.API_URL}/offer/main`, {
      next: { revalidate: 60 },
    }),
  );

  if (fetchError) {
    return null;
  }

  const { error: parseError, result: data } = await Try<Offer>(response.json());

  if (parseError) {
    return null;
  }

  return data;
};
