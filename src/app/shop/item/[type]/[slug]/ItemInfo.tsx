import { Try } from "@/utils/safeTry";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  title: string;
  slug: string;
  description: string;
};
export default async function ItemInfo({ title, slug, description }: Props) {
  const { error, result: buffer } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/items/${slug}.jpg`).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    }),
  );

  if (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }

  const { base64 } = await getPlaiceholder(buffer, { size: 4 });

  return (
    <div>
      <h1 className="stone-800 mb-2 font-serif text-3xl font-bold leading-none tracking-tight lg:text-4xl">
        {title}
      </h1>
      <p className="mb-6 leading-7 text-stone-600">{description}</p>
      <Image
        src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${slug}.jpg`}
        width={448}
        height={448}
        alt={title}
        placeholder="blur"
        blurDataURL={base64}
        priority
        sizes="(min-width: 1024px) calc(50vw - (50vw - min(1680px, 82.2222vw) / 2)), calc(100vw - 48px)"
        className="aspect-square w-full object-cover object-center lg:w-[calc(50vw-var(--global-viewport-padding))]"
      />
    </div>
  );
}
