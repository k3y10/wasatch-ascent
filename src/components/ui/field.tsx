import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-5", className)} {...props} />
  ),
);
FieldGroup.displayName = "FieldGroup";

type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "vertical" | "horizontal";
};

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group/field flex gap-2 data-[invalid]:text-destructive",
        orientation === "horizontal" ? "items-center justify-between" : "flex-col",
        className,
      )}
      {...props}
    />
  ),
);
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn("font-display text-base font-semibold", className)} {...props} />
));
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs leading-relaxed text-muted-foreground", className)} {...props} />
  ),
);
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} role="alert" className={cn("text-xs text-destructive", className)} {...props} />
  ),
);
FieldError.displayName = "FieldError";

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel };
