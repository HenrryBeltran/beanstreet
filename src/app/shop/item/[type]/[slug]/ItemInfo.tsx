import Image from "next/image";

type Props = {
  title: string;
  slug: string;
  description: string;
};
export default function ItemInfo({ title, slug, description }: Props) {
  return (
    <div>
      <h1 className="stone-800 mb-2 font-serif text-3xl font-bold leading-none tracking-tight lg:text-4xl">
        {title}
      </h1>
      <p className="mb-6 leading-7 text-stone-600">{description}</p>
      <Image
        src={`${process.env.SITE_URL}/items/${slug}.jpg`}
        width={448}
        height={448}
        alt={title}
        sizes="(min-width: 1024px) calc(50vw - (50vw - min(1680px, 82.2222vw) / 2)), calc(100vw - 48px)"
        className="aspect-square w-full object-cover object-center lg:w-[calc(50vw-var(--global-viewport-padding))]"
      />
    </div>
  );
}
