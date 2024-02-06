import { Item } from "@/lib/getSelectedItems";
import Image from "next/image";
import Link from "next/link";

export default function CarouselCard({ item }: { item: Item }) {
  return (
    <li className="relative w-fit snap-start">
      <Link
        className="block w-full space-y-3 pb-3 tap-highlight-transparent"
        href={`/shop/item/${item.type}/${item.slug}`}
      >
        <Image
          src={`${process.env.SITE_URL}/items/${item.slug}.jpg`}
          width={320}
          height={320}
          priority={true}
          className="aspect-square bg-stone-300 object-cover object-center"
          alt={item.name}
        />
        <h3 className="font-serif text-xl font-bold leading-none text-stone-800">
          {item.name}
        </h3>
        <p className="text-sm leading-none text-stone-500">{item.sectionName}</p>
        <div className="flex items-baseline justify-between">
          <div className="space-x-3 font-medium">
            {item.priceWDiscount ? (
              <span className="leading-none text-stone-500 line-through">
                ${item.price}
              </span>
            ) : (
              <span className="leading-none text-stone-700">${item.price}</span>
            )}
            {item.priceWDiscount && (
              <span className="leading-none text-red-500">${item.priceWDiscount}</span>
            )}
          </div>
          {item.priceWDiscount && (
            <span className="rounded-full bg-orange-100 px-3 py-1.5 text-sm leading-none text-orange-600">
              -{item.discount}%
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
