import Image from "next/image";
import sanFrancisco from "../../../public/south-san-francisco-cover.jpg";
import newYork from "../../../public/new-york-cover.jpg";
import Map from "./Map";

export default function MapContainer() {
  return (
    <section className="bg-stone-50">
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 lg:grid-rows-2">
        <div className="aspect-square max-h-fit w-full max-w-[1200px] justify-self-end p-6 lg:w-[50vw] lg:p-16">
          <h2 className="font-serif text-5xl font-bold text-red-500 lg:text-[5.2vw] lg:leading-none">
            South San Francisco
          </h2>
          <p className="mt-6 text-base leading-none text-stone-800 lg:mt-8 lg:text-lg lg:leading-none">
            465 Grand Ave, CA 94080.
          </p>
          <span className="mb-10 mt-2 inline-block text-base leading-none text-stone-600 lg:mt-4 lg:text-lg lg:leading-none">
            +01 598 222 4444
          </span>
          <Map center={[37.65611701056544, -122.41519097116384]} />
        </div>
        <Image
          src={sanFrancisco}
          quality={80}
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-square justify-self-start object-cover"
          alt="San Francisco Image Cover"
        />
        <Image
          src={newYork}
          quality={85}
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-square justify-self-end object-cover"
          alt="San Francisco Image Cover"
          loading="lazy"
        />
        <div className="row-start-3 aspect-square max-h-fit w-full max-w-[1200px] justify-self-start p-6 lg:row-start-auto lg:w-[50vw] lg:p-16">
          <h2 className="font-serif text-5xl font-bold text-red-500 lg:text-[5.2vw] lg:leading-none">
            New York
          </h2>
          <p className="mt-6 text-base leading-none text-stone-800 lg:mt-8 lg:text-lg lg:leading-none">
            421 W 13th St, NY 10014.
          </p>
          <span className="mb-10 mt-2 inline-block text-base leading-none text-stone-600 lg:mt-4 lg:text-lg lg:leading-none">
            +01 598 222 3333
          </span>
          <Map center={[40.7410453158308, -74.00691147438032]} />
        </div>
      </div>
    </section>
  );
}
