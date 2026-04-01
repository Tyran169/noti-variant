import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 has-data-[slot=alert-action]:pr-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info: "alert-info border-info-border bg-info-soft text-info-soft-fg *:data-[slot=alert-description]:text-info-soft-fg-muted",
        success:
          "alert-success border-success-border bg-success-soft text-success-soft-fg *:data-[slot=alert-description]:text-success-soft-fg-muted",
        warning:
          "alert-warning border-warning-border bg-warning-soft text-warning-soft-fg *:data-[slot=alert-description]:text-warning-soft-fg-muted",
        destructive:
          "alert-destructive border-destructive-border bg-destructive-soft text-destructive-soft-fg *:data-[slot=alert-description]:text-destructive-soft-fg-muted",
        "destructive-text":
          "alert-destructive-text bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-heading font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [.alert-destructive-text_&_a]:hover:text-destructive [.alert-destructive_&_a]:hover:text-destructive-soft-fg-hover [.alert-info_&_a]:hover:text-info-soft-fg-hover [.alert-success_&_a]:hover:text-success-soft-fg-hover [.alert-warning_&_a]:hover:text-warning-soft-fg-hover",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance text-muted-foreground text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4 [.alert-destructive-text_&_a]:hover:text-destructive [.alert-destructive_&_a]:hover:text-destructive-soft-fg-hover [.alert-info_&_a]:hover:text-info-soft-fg-hover [.alert-success_&_a]:hover:text-success-soft-fg-hover [.alert-warning_&_a]:hover:text-warning-soft-fg-hover",
        className
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
