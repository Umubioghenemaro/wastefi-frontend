"use client";

import { Button } from "@/components/ui";
import { useToast } from "@/lib/hooks/useToast";

/**
 * Toast Demo Component
 * Showcases toast notification variants
 * For development and testing purposes
 */

export function ToastDemo() {
  const toast = useToast();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Toast Notifications Demo</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="success"
          onClick={() =>
            toast.success("Your submission has been saved successfully!", "Success")
          }
        >
          Show Success
        </Button>
        
        <Button
          variant="destructive"
          onClick={() =>
            toast.error("Failed to process request. Please try again.", "Error")
          }
        >
          Show Error
        </Button>
        
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Your session will expire in 5 minutes.", "Warning")
          }
        >
          Show Warning
        </Button>
        
        <Button
          variant="secondary"
          onClick={() =>
            toast.info("New feature: You can now export your collection history!", "Info")
          }
        >
          Show Info
        </Button>
        
        <Button
          variant="outline"
          onClick={() =>
            toast.toast({
              title: "Custom Toast",
              message: "This toast will disappear in 10 seconds",
              variant: "success",
              duration: 10000,
            })
          }
        >
          Long Duration (10s)
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => toast.dismissAll()}
        >
          Dismiss All
        </Button>
      </div>
    </div>
  );
}
