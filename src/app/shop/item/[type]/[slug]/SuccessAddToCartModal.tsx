import { getCartCount } from "@/lib/getCart";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type Props = {
  item: {
    type: string;
    name: string;
    slug: string;
    sweetener?: string;
    size?: string;
    sizeUnit?: string;
    milk?: string;
    warmed?: boolean;
    adjustOrder?: string;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SuccessAddToCartModal({ item, isOpen, setIsOpen }: Props) {
  const { data, isFetching } = useQuery({
    queryFn: getCartCount,
    queryKey: ["cart", "count"],
  });

  if (isFetching) {
    return;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed bottom-0 left-0 z-10 w-full p-4 transition-all md:bottom-auto md:left-auto md:right-0 md:top-0 md:max-w-md md:px-6 md:pt-16">
        <Transition.Child
          as={Fragment}
          enter="ease-[cubic-bezier(0.22,0.61,0.36,1)] duration-[400ms]"
          enterFrom="opacity-0 translate-y-12 md:-translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="ease-[cubic-bezier(0.22,0.61,0.36,1)] duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-12 md:-translate-y-12"
        >
          <div className="relative w-full rounded-md border border-stone-300/80 bg-stone-50 p-6 shadow-xl shadow-stone-700/20 transition-all md:max-w-md">
            <button
              className="absolute right-0 top-0 m-[1.125rem] rounded-md p-1.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-900"
              onClick={() => setIsOpen(false)}
            >
              <X absoluteStrokeWidth strokeWidth={1.5} size={24} />
            </button>
            <h3 className="w-5/6 text-xl font-bold leading-tight tracking-tight text-stone-800">
              {item.type} added to your cart
            </h3>
            <div className="mt-6 flex gap-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}.jpg`}
                width={96}
                height={96}
                quality={75}
                className="aspect-square h-24 w-24 object-cover object-center"
                alt={`${item.name} image`}
              />
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold tracking-tight text-stone-800 md:text-xl">
                  {item.name}
                </h4>
                <ul className="[&>li]:leading-relaxed">
                  {item.size && (
                    <li className="text-sm text-stone-600">
                      {item.size} - {item.sizeUnit}
                    </li>
                  )}
                  {item.milk && item.milk !== "None" && (
                    <li className="text-sm text-stone-600">{item.milk}</li>
                  )}
                  {item.sweetener && (
                    <li className="text-sm text-stone-600">{item.sweetener}</li>
                  )}
                  {item.warmed && (
                    <li className="text-sm text-stone-600">
                      {item.warmed ? "Warmed" : "Not warmed"}
                    </li>
                  )}
                  {item.adjustOrder && (
                    <li className="text-sm text-stone-600">{item.adjustOrder}</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <a
                href="/cart"
                type="button"
                className="block w-full rounded-full bg-stone-700 px-4 py-2.5 text-center font-medium text-stone-50 outline-none hover:bg-stone-600"
                onClick={() => setIsOpen(false)}
              >
                View cart ({data?.count})
              </a>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
