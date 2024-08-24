"use client";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const buttonStyles = cva(
  "rounded-full py-2 transition-all px-10 flex items-center gap-2 capitalize justify-center border-2 rounded font-semibold",
  {
    variants: {
      intent: {
        outlineWine: "border-main-wine",
        filledWine: "bg-main-wine text-main-cream border-main-wine",
        outlineGreen: "border-main-green",
        filledGreen: "bg-main-green text-main-cream border-main-green",
      },
      size: {
        lg: " py-3",
        sm: " py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
  }
);

type Props = {
  children: React.ReactNode;
  icon?: keyof typeof Icons;
  onClick?: (args: any) => void;
  type?: "button" | "submit";
};

const Button = ({
  children,
  intent,
  size,

  type,
  fullWidth,
  onClick,
}: Props & VariantProps<typeof buttonStyles>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles({ intent, size, fullWidth })}
    >
      {children}
    </button>
  );
};

export default Button;
