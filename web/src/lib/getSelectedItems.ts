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

export default async function getSelectedItems(type: string): Promise<SelectedCoffees> {
  const response = await fetch(`${process.env.API_URL}/item/selected/${type}`, {
    next: { revalidate: 10 },
  });
  const data: SelectedCoffees = await response.json();

  return data;
}
