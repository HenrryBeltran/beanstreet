import { Try } from "@/utils/try";

export type Items = {
  result: Item[];
  count: number;
};

export type Item = {
  name: string;
  slug: string;
  price: string;
  sectionName: string;
  sectionSlug: string;
  type: string;
  priceWDiscount: string | null;
  discount: number | null;
};

type GetHandler<T> = (searchParams?: string) => Promise<T | null>;

export const getAllItems: GetHandler<Items> = async (searchParams) => {
  const search = searchParams ?? "";

  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item${search}`, {
      cache: "no-store",
      next: { tags: ["items"] },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get items.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Items>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse items data.", parseError);
    return null;
  }

  return data;
};

export const getAllCountItems: GetHandler<{ count: number }> = async () => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item/count`, {
      cache: "no-store",
      next: { tags: ["items", "count"] },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get items.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{ count: number }>(
    response.json(),
  );

  if (parseError) {
    console.error("~ Server Error: Failed to parse items data.", parseError);
    return null;
  }

  return data;
};
