import { Item } from "@/lib/getAllItems";
import { Try } from "@/utils/safeTry";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  item: Item;
};

export default async function ItemCard({ item }: Props) {
  const { error, result: buffer } = await Try(
    fs.readFile(
      process.env.NODE_ENVIRONMENT === "development"
        ? `./public/items/${item.slug}.jpg`
        : `./items/${item.slug}.jpg`,
    ),
  );

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  const { base64 } = await getPlaiceholder(buffer, { size: 4 });

  return (
    <li className="relative w-full">
      <Link
        className="group relative block w-full space-y-3 pb-3"
        href={`/shop/item/${item.type}/${item.slug}`}
      >
        <div className="overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}.jpg`}
            alt={item.name}
            quality={90}
            width={320}
            height={320}
            placeholder="blur"
            blurDataURL={base64}
            loading="lazy"
            sizes="(min-width: 768px) 33vw, 50vw"
            className="hover aspect-square w-full bg-stone-300 object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
          />
        </div>
        <h4 className="px-2 font-serif text-[min(1.25rem,4vw)] font-bold leading-tight text-stone-800 md:px-0">
          {item.name}
        </h4>
        <p className="px-2 text-[min(0.875rem,3.25vw)] leading-none text-stone-500 md:px-0">
          {item.sectionName}
        </p>
        <div className="flex items-baseline justify-between px-2 md:px-0">
          <div className="space-x-[min(0.75rem,2.125vw)] font-medium">
            <span
              data-discount={item.priceWDiscount !== null}
              className="text-[min(1rem,4vw)] leading-none data-[discount=false]:text-stone-700 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
            >
              ${item.price}
            </span>
            {item.priceWDiscount && (
              <span className="text-[min(1rem,4vw)] leading-none text-red-500">
                ${item.priceWDiscount}
              </span>
            )}
          </div>
          {item.priceWDiscount && (
            <span className="rounded-full bg-orange-100 px-[0.75em] py-[0.375em] text-[min(0.875rem,3.25vw)] leading-none text-orange-600">
              -{item.discount}%
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
