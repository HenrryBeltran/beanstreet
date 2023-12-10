import { Item } from "@/lib/getSelectedItems";
import Image from "next/image";

export default function CarouselCard({ item }: { item: Item }) {
  return (
    <li className="relative w-fit snap-start space-y-3 pb-3">
      <Image
        src={`${process.env.SITE_URL}/items/${item.slug}.jpg`}
        width={320}
        height={320}
        loading="eager"
        className="aspect-square bg-stone-300 object-cover object-center"
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
