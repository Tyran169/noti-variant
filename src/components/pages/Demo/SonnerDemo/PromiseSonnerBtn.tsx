"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function PromiseSonnerBtn() {
  return (
    <Button
      className="h-9.5 w-24 py-0"
      onClick={() => {
        toast.promise<{ name: string }>(
          () =>
            new Promise((resolve, reject) =>
              setTimeout(() => {
                //randomly resolve or reject
                Math.random() > 0.5
                  ? resolve({ name: "New Event" })
                  : reject(new Error("Failed to create event"));
              }, 2000)
            ),
          {
            loading: "Loading...",
            success: (data) => `${data.name} has been created`,
            error: "There was an error creating the event",
            richColors: true
          }
        );
      }}
    >
      Promise
    </Button>
  );
}
