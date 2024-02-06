import { Try } from "@/utils/try";

export type SelectedCoffees = {
  result: Item[];
};

export type Item = {
  name: string;
  slug: string;
  price: string;
  priceWDiscount: string | null;
  discount: number | null;
  sectionName: string;
  sectionSlug: string;
  type: string;
};

type GetHandler = (type: string) => Promise<SelectedCoffees | null>;

export const getSelectedItems: GetHandler = async (type) => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item/selected/${type}`, {
      next: { revalidate: 60 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get selected coffees.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<SelectedCoffees>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse selected coffees data.", parseError);
    return null;
  }

  return data;
};
