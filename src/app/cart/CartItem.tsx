import { SelectCartItem } from "@/drizzle/schemas";
import { CartItemToUpdate } from "@/lib/updateFromCart";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartQuantityListbox from "./CartQuantityListBox";
import DeleteItemButton from "./DeleteItemButton";

type Props = {
  item: SelectCartItem;
  currentItemId: string;
  isUpdatePending: boolean;
  isUpdateSuccess: boolean;
  isDeletePending: boolean;
  isRefetching: boolean;
  updateItem: (item: CartItemToUpdate) => void;
  deleteItem: (id: string) => void;
};

export default function CartItem({
  item,
  currentItemId,
  isUpdatePending,
  isUpdateSuccess,
  isDeletePending,
  isRefetching,
  updateItem,
  deleteItem,
}: Props) {
  return (
    <li
      data-pending-delete={isDeletePending && currentItemId === item.id}
      className="flex gap-8 py-6 transition-opacity duration-300 data-[pending-delete=true]:opacity-30 lg:gap-12"
    >
      <div className="flex max-w-2xl flex-grow flex-col gap-4 lg:flex-row lg:gap-8">
        <Link href={item.url ?? "/shop"} className="block">
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}.jpg`}
            width={128}
            height={128}
            quality={70}
            sizes="(min-width: 1024px) 128px, 96px"
            className="aspect-square h-24 w-24 bg-stone-200/70 object-cover object-center lg:h-32 lg:w-32"
            alt={`${item.name} image`}
          />
        </Link>
        <ul className="space-y-1 text-stone-600 [&>li]:leading-tight">
          <li className="mb-2 font-serif text-xl font-bold text-stone-800 hover:text-stone-600 lg:text-2xl">
            <Link href={item.url ?? "/shop"}>{item.name}</Link>
          </li>
          {item.size && (
            <li>
              {item.size} - {item.sizeUnit}
            </li>
          )}
          {item.milk && item.milk !== "None" && <li>{item.milk}</li>}
          {item.sweetener && <li>Sugar - {item.sweetenerTsp} tsp</li>}
          {item.warmed !== null && <li>{item.warmed ? "Warmed" : "Not warmed"}</li>}
          {item.adjustOrder !== null && <li>{item.adjustOrder}</li>}
        </ul>
      </div>
      <div className="flex flex-col items-start justify-start gap-8 xl:flex-row">
        <div className="flex items-center gap-4 xl:gap-8">
          <span className="text-sm text-stone-600">Quantity</span>
          <CartQuantityListbox handleUpdate={updateItem} item={item} />
        </div>
        <div className="ml-auto">
          {(isUpdatePending || isRefetching) &&
          isUpdateSuccess &&
          item.id === currentItemId ? (
            <Loader2
              className="mx-auto mb-2 min-h-6 min-w-6 animate-spin text-sky-500"
              absoluteStrokeWidth
              strokeWidth={2}
              size={24}
            />
          ) : (
            <div className="mb-2 flex flex-col gap-1">
              <span className="text-lg font-semibold leading-none text-stone-700 lg:text-xl">
                $
                {(
                  Number(item.unitPriceWDiscount ?? item.unitPrice) * item.quantity
                ).toFixed(2)}
              </span>
              {item.discount && (
                <>
                  <span className="text-base font-medium leading-none text-stone-500 line-through">
                    ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          )}
          <DeleteItemButton
            handleDelete={() => deleteItem(item.id)}
            isPending={isDeletePending}
          />
        </div>
      </div>
    </li>
  );
}
