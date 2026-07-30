import { Button, buttonVariants } from "@/components/ui/button";
import { cn, isLogged } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import * as React from "react";

// 1. Omit conflicting standard button props if needed, and extend with custom logic
export interface LoggedButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  /** Event handler triggered on click ONLY when the user is logged in */
  onLoggedClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LoggedButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LoggedButtonProps
>(
  (
    { onLoggedClick, children, variant, size, className, onClick, ...props },
    ref,
  ) => {
    // 2. Unauthenticated State: Render a TanStack Link visually styled as a Button
    if (!isLogged()) {
      return (
        <Link
          to="/auth/login"
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(props as Omit<
            React.ComponentPropsWithoutRef<typeof Link>,
            "to"
          >)}
        >
          {children}
        </Link>
      );
    }

    // 3. Authenticated State: Render standard Shadcn Button
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        variant={variant}
        size={size}
        className={className}
        onClick={(e) => {
          onLoggedClick?.(e);
          onClick?.(e); // Preserves standard onClick fallback if passed
        }}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

LoggedButton.displayName = "LoggedButton";
