type Props = {
  handleDelete: () => void;
  isPending?: boolean;
};

export default function DeleteItemButton({ handleDelete, isPending }: Props) {
  return (
    <button
      type="button"
      onClick={handleDelete}
      data-pending={isPending}
      disabled={isPending}
      className="flex items-center justify-center text-sm text-red-500 hover:underline data-[pending=true]:cursor-not-allowed data-[pending=true]:text-stone-500 lg:text-base"
    >
      Remove
    </button>
  );
}
