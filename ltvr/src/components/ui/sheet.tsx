"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

const Sheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>
>(({ ...props }, ref) => (
  <SheetPrimitive.Root ref={ref} data-slot="sheet" {...props} />
));

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>
>(({ ...props }, ref) => (
  <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />
));

const SheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ ...props }, ref) => (
  <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />
));

const SheetPortal = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Portal>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>
>(({ ...props }, ref) => (
  <SheetPrimitive.Portal ref={ref} data-slot="sheet-portal" {...props} />
));

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      className,
    )}
    {...props}
  />
));

// Generate a unique ID for the sheet content description
const useSheetContentId = () => {
  return React.useId();
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    describedBy?: string;
  }
>(({ className, children, side = "right", describedBy, ...props }, ref) => {
  // Generate a unique id for aria-describedby if not provided
  const generatedId = useSheetContentId();
  const contentDescriptionId = describedBy || `sheet-content-${generatedId}`;

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        aria-describedby={contentDescriptionId}
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {/* Default hidden description for accessibility if no SheetDescription is provided */}
        <div id={contentDescriptionId} className="sr-only">
          Sheet content
        </div>
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
});

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1.5 p-4", className)}
    {...props}
  />
));

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
));

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("text-foreground font-semibold", className)}
    {...props}
  />
));

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

// Add display names
Sheet.displayName = "Sheet";
SheetTrigger.displayName = "SheetTrigger";
SheetClose.displayName = "SheetClose";
SheetPortal.displayName = "SheetPortal";
SheetOverlay.displayName = "SheetOverlay";
SheetContent.displayName = "SheetContent";
SheetHeader.displayName = "SheetHeader";
SheetFooter.displayName = "SheetFooter";
SheetTitle.displayName = "SheetTitle";
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};