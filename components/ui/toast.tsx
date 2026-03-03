"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "destructive" | "success";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  destructive: "border-destructive/50 bg-destructive/10 text-destructive",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, title, description, variant = "default", onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm rounded-lg border px-4 py-3 shadow-lg",
          variantStyles[variant],
          className
        )}
        role="status"
        {...props}
      >
        {title ? <div className="text-sm font-semibold">{title}</div> : null}
        {description ? (
          <div className="text-sm text-muted-foreground">{description}</div>
        ) : null}
        {onClose ? (
          <button
            type="button"
            aria-label="Close"
            className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition hover:text-foreground"
            onClick={onClose}
          >
            ×
          </button>
        ) : null}
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast };
