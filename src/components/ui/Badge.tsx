import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  variant?: "gold" | "red" | "green" | "black";
}

export default function Badge({
  children,
  variant = "gold",
}: Props) {
  const variants = {
    gold: "bg-[#C89A2D] text-white",
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
    black: "bg-black text-white",
  };

  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}