import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Icons } from "./Icons";

const styles = cva(
  "px-5 py-1 rounded-full font-medium flex gap-2 items-center text-nowrap",
  {
    variants: {
      color: {
        green: "bg-main-green/10 text-main-green",
        blue: "bg-main-blue/10 text-main-blue",
        red: "bg-main-red/10 text-main-red",
      },
    },
  }
);

type Props = {
  children: React.ReactNode;
  iconLeft?: keyof typeof Icons;
  iconRight?: keyof typeof Icons;
  onClick?: () => void;
  type?: "button" | "submit";
};

const QueryButton = ({
  children,
  color,
  iconLeft,
  iconRight,
  onClick,
}: Props & VariantProps<typeof styles>) => {
  const IconLeft = Icons[iconLeft ? iconLeft : "chevronRight"];
  const IconRight = Icons[iconRight ? iconRight : "chevronRight"];

  return (
    <button onClick={onClick} className={styles({ color })}>
      {iconLeft ? <IconLeft size={20} strokeWidth={3} /> : null}
      {children}
      {iconRight ? <IconRight size={20} strokeWidth={3} /> : null}
    </button>
  );
};

export default QueryButton;
