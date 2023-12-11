"use server";

export type SelectedCoffees = {
  result: Item[];
};

export type Item = {
  name: string;
  slug: string;
  price: string;
  price_w_discount: string | null;
  discount: number | null;
  section_name: string;
  section_slug: string;
};

export default async function getSelectedItems(
  type: string,
): Promise<SelectedCoffees | null> {
  let response: Response;

  try {
    response = await fetch(`${process.env.API_URL}/item/selected/${type}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.log("~ Fetch Error: Failed to get selected coffees", error);
    return null;
  }

  const data: SelectedCoffees | undefined = await response.json();

  if (!data) {
    console.error("~ Server Error: Failed to parse selected coffees data");
    return null;
  }

  return data;
}
