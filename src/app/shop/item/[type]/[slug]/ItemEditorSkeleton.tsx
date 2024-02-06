export default function ItemEditorSkeleton() {
  return (
    <>
      <div className="px-6 py-8 lg:mx-[var(--global-viewport-padding)] lg:px-0">
        <div className="h-3.5 w-80 animate-pulse rounded-md bg-stone-200/70 lg:h-4" />
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-12 px-6 pb-16 pt-8 sm:mx-[var(--global-md-viewport-padding)] sm:px-0 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16 lg:pb-32 xl:gap-32">
        <div className="">
          <div className="mb-2 h-[30px] w-64 animate-pulse rounded-md bg-stone-200/70 lg:h-9" />
          <div className="mb-6 space-y-2">
            <div className="h-5 w-full animate-pulse rounded-md bg-stone-200/70" />
            <div className="h-5 w-full animate-pulse rounded-md bg-stone-200/70" />
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-stone-200/70" />
          </div>
          <div className="aspect-square w-full animate-pulse bg-stone-200/70" />
        </div>
        <div className="space-y-6">
          <div className="h-8 w-56 animate-pulse rounded-md bg-stone-200/70" />
          <div className="h-[512px] w-full animate-pulse rounded-md bg-stone-200/70" />
          <div className="h-11 w-72 animate-pulse rounded-full bg-stone-200/70" />
        </div>
      </div>
    </>
  );
}
