import { sql } from "drizzle-orm";
import { RequestHandler } from "express";
import { db } from "../drizzle/index.js";

export const getAllItems: RequestHandler = async (req, res) => {
  const sort = req.query.sort as "name" | "price" | undefined;
  const direction = req.query.d as "asc" | "desc" | undefined;

  try {
    const result = (await db.execute(sql`
      SELECT * FROM (
        (SELECT
          drink.name,
          drink.slug,
          CAST(base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00) AS numeric(100, 2)) AS price,
          CAST((base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00)) * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount
        FROM drink
        LEFT JOIN offer
          ON offer.id = drink.offer_id
        LEFT JOIN size
          ON size.id = drink.default_size
        LEFT JOIN milk
          ON milk.id = drink.default_milk
        ORDER BY
          CASE
            WHEN section_name = 'Hot Coffees' THEN 1
            WHEN section_name = 'Hot Drinks' THEN 2
            WHEN section_name = 'Cold Coffees' THEN 3
          END,
          name ASC)
          
        UNION ALL
          
        (SELECT
          sandwich.name, 
          sandwich.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount
        FROM sandwich
        LEFT JOIN offer
          ON offer.id = sandwich.offer_id
        ORDER BY name ASC)
          
        UNION ALL
          
        (SELECT
          pastrie.name,
          pastrie.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount
        FROM pastrie
        LEFT JOIN offer
          ON offer.id = pastrie.offer_id
        ORDER BY name ASC)
        ) AS items; 
    `)) as {
      name: string;
      slug: string;
      price: string;
      price_w_discount: string | null;
      discount: number | null;
    }[];

    const resultOrder = (
      by: "name" | "price" = "name",
      direction: "asc" | "desc" = "asc",
    ) =>
      result.sort((a, b) => {
        const key = by === "price" ? "price_w_discount" : by;
        const valueA = a[key] ?? a["price"];
        const valueB = b[key] ?? b["price"];

        if (direction === "asc") {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
          return 0;
        }

        if (direction === "desc") {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
          return 0;
        }

        return 0;
      });

    return res.json({
      result: sort ? resultOrder(sort, direction ?? "asc") : result,
      count: result.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to get all items", error });
  }
};

export const getItemsBySection: RequestHandler = async (req, res) => {
  const slug = req.params.slug;
  const sort = req.query.sort as "price" | undefined;
  const direction = req.query.d as "asc" | "desc" | undefined;

  try {
    const result = (await db.execute(sql`
      SELECT * FROM (
        (SELECT
          drink.name,
          drink.slug,
          CAST(base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00) AS numeric(100, 2)) AS price,
          CAST((base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00)) * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount,
          section_name,
          section_slug
        FROM drink
        LEFT JOIN offer
          ON offer.id = drink.offer_id
        LEFT JOIN size
          ON size.id = drink.default_size
        LEFT JOIN milk
          ON milk.id = drink.default_milk
        ORDER BY
          CASE
            WHEN section_name = 'Hot Coffees' THEN 1
            WHEN section_name = 'Hot Drinks' THEN 2
            WHEN section_name = 'Cold Coffees' THEN 3
          END,
          name ASC)
          
        UNION ALL
          
        (SELECT
          sandwich.name, 
          sandwich.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount,
          section_name,
          section_slug
        FROM sandwich
        LEFT JOIN offer
          ON offer.id = sandwich.offer_id
        ORDER BY name ASC)
          
        UNION ALL
          
        (SELECT
          pastrie.name,
          pastrie.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount,
          section_name,
          section_slug
        FROM pastrie
        LEFT JOIN offer
          ON offer.id = pastrie.offer_id
        ORDER BY name ASC)
      ) AS items
      WHERE section_slug = ${slug};
    `)) as {
      name: string;
      slug: string;
      price: string;
      price_w_discount: string | null;
      discount: number | null;
      section_name: string;
      section_slug: string;
    }[];

    const resultOrder = (by: "price", direction: "asc" | "desc" = "asc") =>
      result.sort((a, b) => {
        const key = by === "price" ? "price_w_discount" : by;
        const valueA = a[key] ?? a["price"];
        const valueB = b[key] ?? b["price"];

        if (direction === "asc") {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
          return 0;
        }

        if (direction === "desc") {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
          return 0;
        }

        return 0;
      });

    return res.json({
      result: sort ? resultOrder(sort, direction ?? "asc") : result,
      count: result.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to get items", error });
  }
};

export const getSelectedDrinks: RequestHandler = async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT
        drink.name,
        drink.slug,
        CAST(base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00) AS numeric(100, 2)) AS price,
        CAST((base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00)) * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
        offer.discount,
        section_name,
        section_slug
      FROM drink
      LEFT JOIN offer
        ON offer.id = drink.offer_id
      LEFT JOIN size
        ON size.id = drink.default_size
      LEFT JOIN milk
        ON milk.id = drink.default_milk
      WHERE selected = true
      ORDER BY name ASC;
    `);

    return res.json({ result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Databese Error: Failed to get drinks", error });
  }
};

export const getSelectedFood: RequestHandler = async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT 
        name,
        slug,
        price,
        price_w_discount,
        discount,
        section_name,
        section_slug
      FROM ( 
        (SELECT
          sandwich.name, 
          sandwich.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount,
          section_name,
          section_slug,
          selected
        FROM sandwich
        LEFT JOIN offer
          ON offer.id = sandwich.offer_id)
          
        UNION ALL
          
        (SELECT
          pastrie.name,
          pastrie.slug,
          base_price AS price,
          CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
          offer.discount,
          section_name,
          section_slug,
          selected
        FROM pastrie
        LEFT JOIN offer
          ON offer.id = pastrie.offer_id)
      ) AS items
      WHERE selected = true
      ORDER BY name ASC;
    `);

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Databese Error: Failed to get food", error });
  }
};

export const getDrinkBySlug: RequestHandler = async (req, res) => {
  const slug = req.params.slug;

  try {
    const drink = await db.execute(sql`
      SELECT
        drink.id,
        drink.name,
        drink.slug,
        drink.description,
        section_name,
        section_slug,
        drink.default_sweetener,
        drink.sweetener_teaspoon,
        milk.name AS default_milk,
        size.name AS default_size,
        CAST(base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00) AS numeric(100, 2)) AS price,
        CAST((base_price + size.extra_cost + COALESCE(milk.extra_cost, 0.00)) * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
        base_price,
        size.extra_cost,
        milk.extra_cost,
        offer.discount
      FROM drink
      LEFT JOIN offer
        ON offer.id = drink.offer_id
      LEFT JOIN size
        ON size.id = drink.default_size
      LEFT JOIN milk
        ON milk.id = drink.default_milk
      WHERE drink.slug = ${slug};
    `);

    const milkOptions = await db.execute(sql`
      SELECT
        milk.id,
        milk.name,
        milk.order,
        milk.extra_cost
      FROM milk_option
      LEFT JOIN milk
        ON milk.id = milk_option.milk_id
      WHERE milk_option.drink_id = ${drink[0].id}
      ORDER BY milk.order ASC NULLS FIRST;
    `);

    const sizeOptions = await db.execute(sql`
      SELECT
        size.id,
        size.name,
        size.unit,
        size.order,
        size.extra_cost
      FROM size_option
      LEFT JOIN size
        ON size.id = size_option.size_id
      WHERE size_option.drink_id = ${drink[0].id}
      ORDER BY size.order ASC;
    `);

    return res.json({ drink, milkOptions, sizeOptions });
  } catch (error) {
    return res.status(500).json({ message: "Database Error: Failed to get item", error });
  }
};

export const getSandwichBySlug: RequestHandler = async (req, res) => {
  const slug = req.params.slug;

  try {
    const sandwich = await db.execute(sql`
      SELECT
        sandwich.id,
        sandwich.name,
        sandwich.slug,
        sandwich.description,
        section_name,
        section_slug,
        base_price,
        CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
        offer.discount
      FROM sandwich
      LEFT JOIN offer
        ON offer.id = offer_id
      WHERE sandwich.slug = ${slug};
    `);

    return res.json({ sandwich });
  } catch (error) {
    return res.status(500).json({ message: "Database Error: Failed to get item", error });
  }
};

export const getPastrieBySlug: RequestHandler = async (req, res) => {
  const slug = req.params.slug;

  try {
    const pastrie = await db.execute(sql`
      SELECT
        pastrie.id,
        pastrie.name,
        pastrie.slug,
        pastrie.description,
        section_name,
        section_slug,
        base_price,
        CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2)) AS price_w_discount,
        offer.discount,
        warmed
      FROM pastrie
      LEFT JOIN offer
        ON offer.id = offer_id
      WHERE pastrie.slug = ${slug};
    `);

    return res.json({ pastrie });
  } catch (error) {
    return res.status(500).json({ message: "Database Error: Failed to get item", error });
  }
};
