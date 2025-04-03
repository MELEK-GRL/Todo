import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  iconLeft,
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded transition-colors font-medium flex items-center gap-2 font-inter font-semibold text-[14px]";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {iconLeft && <span className="w-5 h-5 flex-shrink-0">{iconLeft}</span>}
      {children}
    </button>
  );
};

export default Button;
