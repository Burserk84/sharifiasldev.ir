import Link from "next/link";
import React from "react";

// --- Style Lookup Objects ---

const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400";

const variantStyles = {
  primary: "bg-orange-500 text-black hover:bg-orange-600",
  secondary:
    "bg-transparent border border-gray-500 text-gray-200 hover:bg-gray-700",
  ghost: "hover:bg-gray-700",
  tertiary: "bg-gray-600 text-gray-200 hover:bg-gray-500",
  ghost: "hover:bg-gray-700",
};

const sizeStyles = {
  default: "h-10 py-2 px-4",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
};

// --- Component Props Interface ---

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  href?: string;
  children: React.ReactNode;
}

// --- The Button Component ---

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      href,
      variant = "primary", // Default variant
      size = "default", // Default size
      ...props
    },
    ref
  ) => {
    // Combine all the style classes together
    const classes = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className, // Allow custom classes to be passed in
    ].join(" ");

    // If an href is passed, render a Link component
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    // Otherwise, render a standard button
    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
