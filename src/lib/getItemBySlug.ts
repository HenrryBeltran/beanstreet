import { Try } from "@/utils/try";

export type Drink = {
  result: {
    id: string;
    name: string;
    slug: string;
    description: string;
    sectionName: string;
    sectionSlug: string;
    type: string;
    defaultSweetener: boolean;
    sweetenerTsp: number;
    defaultMilk: string | null;
    defaultSize: string;
    price: string;
    priceWDiscount: string | null;
    basePrice: string;
    discount: number | null;
    milkOptions: {
      id: string;
      name: string;
      extraCost: number;
    }[];
    sizeOptions: {
      id: string;
      name: string;
      unit: string;
      extraCost: number;
    }[];
  };
};

export type Sandwich = {
  result: {
    id: string;
    name: string;
    slug: string;
    description: string;
    sectionName: string;
    sectionSlug: string;
    type: string;
    basePrice: string;
    priceWDiscount: string | null;
    discount: number | null;
  };
};

export type Pastrie = {
  result: {
    id: string;
    name: string;
    slug: string;
    description: string;
    sectionName: string;
    sectionSlug: string;
    type: string;
    basePrice: string;
    priceWDiscount: string | null;
    discount: number | null;
    warmed: boolean;
  };
};

type GetHandler<T> = (type: string, slug: string) => Promise<T | null>;

export const getDrinkBySlug: GetHandler<Drink> = async (type, slug) => {
  const url = `${process.env.API_URL}/item/drink/${slug}`;

  const { error: fetchError, result: response } = await Try(
    fetch(url, {
      next: { tags: [type, slug], revalidate: 900 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get item.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Drink>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse item data.", parseError);
    return null;
  }

  return data;
};

export const getSandwichBySlug: GetHandler<Sandwich> = async (type, slug) => {
  const url = `${process.env.API_URL}/item/sandwich/${slug}`;

  const { error: fetchError, result: response } = await Try(
    fetch(url, {
      next: { tags: [type, slug], revalidate: 900 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get item.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Sandwich>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse item data.", parseError);
    return null;
  }

  return data;
};

export const getPastrieBySlug: GetHandler<Pastrie> = async (type, slug) => {
  const url = `${process.env.API_URL}/item/pastrie/${slug}`;

  const { error: fetchError, result: response } = await Try(
    fetch(url, {
      next: { tags: [type, slug], revalidate: 900 },
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get item.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<Pastrie>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse item data.", parseError);
    return null;
  }

  return data;
};
