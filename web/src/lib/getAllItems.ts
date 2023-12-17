import { Try } from "@/utils/try";

export type SelectedCoffees = {
  result: Item[];
  count: number;
};

export type Item = {
  name: string;
  slug: string;
  price: string;
  price_w_discount: string | null;
  discount: number | null;
};

type GetHandler<T> = () => Promise<T | null>;

export const getAllItems: GetHandler<SelectedCoffees> = async () => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item`, {
      cache: "no-store",
      next: { tags: ["items"] },
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

export const getAllCountItems: GetHandler<{ count: string }> = async () => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item/count`, {
      cache: "no-store",
      next: { tags: ["items", "count"] },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get selected coffees.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{ count: string }>(
    response.json(),
  );

  if (parseError) {
    console.error("~ Server Error: Failed to parse selected coffees data.", parseError);
    return null;
  }

  return data;
};
