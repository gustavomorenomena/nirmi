import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Container = forwardRef<
  HTMLDivElement,
  ComponentPropsWithRef<"div">
>(({ children, className, ...props }, ref) => (
  <div
    {...props}
    className={twMerge("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    ref={ref}
  >
    {children}
  </div>
));
