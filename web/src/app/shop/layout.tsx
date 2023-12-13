type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return <body className="bg-stone-50">{children}</body>;
}
