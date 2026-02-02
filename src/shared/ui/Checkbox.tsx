import React, { forwardRef } from "react";
import cn from "classnames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className={cn("w-4 h-4 accent-[#006AFF]", className)}
          {...props}
        />
        {label && <span className="text-sm text-white">{label}</span>}
      </label>
    );
  }
);
