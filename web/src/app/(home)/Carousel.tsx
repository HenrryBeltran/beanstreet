import axios from "axios";
import Image from "next/image";
import CarouselScroll from "./client/CarouselScroll";

type SeletedCoffees = {
  result: Item[];
};

type Item = {
  name: string;
  slug: string;
  price: string;
  price_w_discount: string | null;
  discount: number | null;
  section_name: string;
  section_slug: string;
};

export default async function Carousel({ type }: { type: "drinks" | "food" }) {
  const response = await axios.get<SeletedCoffees>(
    `http://localhost:3500/api/item/selected/${type}`,
  );
  const data = response.data;

  return (
    <CarouselScroll itemLength={data.result.length}>
      {data.result.map((item) => (
        <CarouselCard item={item} key={item.slug} />
      ))}
    </CarouselScroll>
  );
}

function CarouselCard({ item }: { item: Item }) {
  return (
    <li className="relative w-fit snap-start space-y-3 pb-3">
      <Image
        src={`http://localhost:3000/items/${item.slug}.jpg`}
        width={320}
        height={320}
        className="aspect-square bg-stone-300 object-cover object-center"
        loading="lazy"
        alt={item.name}
      />
      <h3 className="font-serif text-xl font-bold leading-none text-stone-800">
        {item.name}
      </h3>
      <p className="text-sm leading-none text-stone-500">{item.section_name}</p>
      <div className="flex items-baseline justify-between">
        <div className="space-x-3 font-medium">
          {item.price_w_discount ? (
            <span className="leading-none text-stone-500 line-through">
              ${item.price}
            </span>
          ) : (
            <span className="leading-none text-stone-700">${item.price}</span>
          )}
          {item.price_w_discount && (
            <span className="leading-none text-red-500">${item.price_w_discount}</span>
          )}
        </div>
        {item.price_w_discount && (
          <span className="rounded-full bg-orange-100 px-3 py-1.5 text-sm leading-none text-orange-600">
            -{item.discount}%
          </span>
        )}
      </div>
    </li>
  );
}
