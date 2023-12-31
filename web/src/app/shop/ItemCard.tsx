import { Item } from "@/lib/getAllItems";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <li className="relative w-full">
      <Link
        className="group relative block w-full space-y-3 pb-3"
        href={`/shop/item/${item.type}/${item.slug}`}
      >
        <div className="overflow-hidden">
          <Image
            src={`${process.env.SITE_URL}/items/${item.slug}.jpg`}
            alt={item.name}
            quality={90}
            width={320}
            height={320}
            sizes="(min-width: 768px) 33vw, 50vw"
            loading="lazy"
            className="hover aspect-square w-full bg-stone-300 object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
          />
        </div>
        <h4 className="font-serif text-[min(1.25rem,4vw)] font-bold leading-tight text-stone-800">
          {item.name}
        </h4>
        <p className="text-[min(0.875rem,3.25vw)] leading-none text-stone-500">
          {item.section_name}
        </p>
        <div className="flex items-baseline justify-between">
          <div className="space-x-[min(0.75rem,2.125vw)] font-medium">
            <span
              data-discount={item.price_w_discount !== null}
              className="text-[min(1rem,4vw)] leading-none data-[discount=false]:text-stone-700 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
            >
              ${item.price}
            </span>
            {item.price_w_discount && (
              <span className="text-[min(1rem,4vw)] leading-none text-red-500">
                ${item.price_w_discount}
              </span>
            )}
          </div>
          {item.price_w_discount && (
            <span className="rounded-full bg-orange-100 px-[0.75em] py-[0.375em] text-[min(0.875rem,3.25vw)] leading-none text-orange-600">
              -{item.discount}%
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
