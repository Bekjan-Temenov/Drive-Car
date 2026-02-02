import React from "react";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "bg-[#006AFF] text-white py-3 rounded-[12px]",
        "hover:bg-[#0055CC] transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            {/* Spinner SVG */}
          </svg>
          Загрузка...
        </span>
      ) : (
        children
      )}
    </button>
  );
}; 