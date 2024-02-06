// import { db } from "@/drizzle/index";
// import { sql } from "kysely";
//
// export const allItemsQuery = db
//   .selectFrom((eb) =>
//     eb
//       .selectFrom("drink")
//       .leftJoin("offer", "offer.id", "drink.offer_id")
//       .leftJoin("size", "size.id", "drink.default_size")
//       .leftJoin("milk", "milk.id", "drink.default_milk")
//       .select(({ ref }) => [
//         "drink.name",
//         "drink.slug",
//         "drink.section_name",
//         "drink.section_slug",
//         "drink.type",
//         sql<string>`CAST(${ref("base_price")} + ${ref(
//           "size.extra_cost",
//         )} + COALESCE(${ref("milk.extra_cost")}, 0.00) AS numeric(100, 2))`.as("price"),
//         sql<string | null>`CAST((${ref("base_price")} + ${ref(
//           "size.extra_cost",
//         )} + COALESCE(${ref("milk.extra_cost")}, 0.00)) * (1.00 - (${ref(
//           "offer.discount",
//         )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
//         "offer.discount",
//       ])
//       .unionAll(
//         db
//           .selectFrom("sandwich")
//           .leftJoin("offer", "offer.id", "sandwich.offer_id")
//           .select(({ ref }) => [
//             "sandwich.name",
//             "sandwich.slug",
//             "sandwich.section_name",
//             "sandwich.section_slug",
//             "sandwich.type",
//             "sandwich.base_price as price",
//             sql<string | null>`CAST(${ref("base_price")} * (1.00 - (${ref(
//               "offer.discount",
//             )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
//             "offer.discount",
//           ])
//           .unionAll(
//             db
//               .selectFrom("pastrie")
//               .leftJoin("offer", "offer.id", "pastrie.offer_id")
//               .select([
//                 "pastrie.name",
//                 "pastrie.slug",
//                 "pastrie.section_name",
//                 "pastrie.section_slug",
//                 "pastrie.type",
//                 "pastrie.base_price as price",
//                 sql<
//                   string | null
//                 >`CAST(base_price * (1.00 - (offer.discount * 0.01)) AS numeric(100, 2))`.as(
//                   "price_w_discount",
//                 ),
//                 "offer.discount",
//               ]),
//           ),
//       )
//       .as("items"),
//   )
//   .selectAll()
//   .orderBy((eb) =>
//     eb
//       .case()
//       .when("section_name", "=", "Hot Coffees")
//       .then(1)
//       .when("section_name", "=", "Hot Drinks")
//       .then(2)
//       .when("section_name", "=", "Cold Coffees")
//       .then(3)
//       .when("section_name", "=", "Sandwiches & More")
//       .then(4)
//       .when("section_name", "=", "Pastries")
//       .then(5)
//       .end(),
//   )
//   .orderBy("name", "asc");
//
// export const allItemsCountQuery = db
//   .selectFrom((eb) =>
//     eb
//       .selectFrom("drink")
//       .select("section_slug")
//       .unionAll(
//         db
//           .selectFrom("sandwich")
//           .select("section_slug")
//           .unionAll(db.selectFrom("pastrie").select("section_slug")),
//       )
//       .as("items"),
//   )
//   .select([(eq) => eq.fn.count("section_slug").as("count")]);
//
