import { CartItemToUpdate } from "@/lib/updateFromCart";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const list = new Array(99).fill(0).map((_, i) => i + 1);

type Props = {
  handleUpdate: (itemOrder: CartItemToUpdate) => void;
  item: CartItemToUpdate;
};

export default function CartQuantityListbox({ handleUpdate, item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity ?? 1);

  useEffect(() => {
    if (quantity !== item.quantity) {
      handleUpdate({ id: item.id, quantity });
    }
  }, [handleUpdate, quantity, item]);

  return (
    <Listbox
      value={quantity}
      onChange={setQuantity}
      as="div"
      className="relative flex h-min justify-center"
    >
      <Listbox.Button className="flex items-center justify-center gap-2 rounded-md bg-stone-200/70 py-2 pl-3 pr-1.5 outline-none">
        <span>{quantity}</span>
        <ChevronDown absoluteStrokeWidth strokeWidth={1.5} size={20} />
      </Listbox.Button>
      <Listbox.Options className="absolute -top-12 left-auto right-2 z-10 max-h-[52.5svh] min-w-64 max-w-64 divide-y divide-stone-300/70 overflow-y-scroll rounded-md border border-stone-300/70 bg-stone-50 shadow-xl shadow-stone-700/20 outline-none lg:-left-2">
        {list.map((value) => (
          <Listbox.Option
            key={value}
            value={value}
            className="flex cursor-pointer items-center gap-2 py-2 pl-3 text-stone-600 hover:bg-stone-200/70 ui-selected:bg-stone-200/70 ui-selected:font-medium ui-selected:text-stone-800"
          >
            <Check
              className="invisible ui-selected:visible"
              absoluteStrokeWidth
              strokeWidth={1.5}
              size={16}
            />
            <span>{value}</span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
