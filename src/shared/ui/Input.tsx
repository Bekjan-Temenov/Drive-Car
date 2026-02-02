import React, { forwardRef } from "react";
import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent border border-[#EBEBEB] rounded-[12px] px-4 py-3",
            "text-white placeholder-white",
            "focus:outline-none focus:border-[#006AFF]",
            "transition-colors",
            { "border-red-500": error },
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
); 