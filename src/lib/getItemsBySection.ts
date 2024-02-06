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

type GetHandler<T> = (section: string, searchParams?: string) => Promise<T | null>;

export const getItemsBySection: GetHandler<Items> = async (section, searchParams) => {
  const search = searchParams ?? "";

  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item/section/${section}${search}`, {
      next: { tags: ["items"], revalidate: 3600 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get items from a section.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Items>(response.json());

  if (parseError) {
    console.error(
      "~ Server Error: Failed to parse items data from a section.",
      parseError,
    );
    return null;
  }

  return data;
};

export const getItemsCountBySection: GetHandler<{ count: number }> = async (section) => {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.API_URL}/item/section/${section}/count`, {
      next: { tags: ["items", "count"], revalidate: 900 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get section.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{ count: number }>(
    response.json(),
  );

  if (parseError) {
    console.error("~ Server Error: Failed to parse section data.", parseError);
    return null;
  }

  return data;
};
