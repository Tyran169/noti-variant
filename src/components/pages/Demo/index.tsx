"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMounted } from "@/hooks/use-mounted";
import { hashIdString } from "@/lib/hashIdString";
import AlertDemo from "./AlertDemo";
import ButtonDemo from "./ButtonDemo";
import SonnerDemo from "./SonnerDemo";

const tabNames = {
  sonner: hashIdString("sonner", { length: 16, seed: 54321 }),
  alert: hashIdString("alert", { length: 16, seed: 54321 }),
  button: hashIdString("button", { length: 16, seed: 54321 })
};

export default function Demo() {
  const [currentTab, setCurrentTab] = useState(tabNames.sonner);

  const isMounted = useMounted();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (Object.keys(tabNames).includes(hash)) {
      setCurrentTab(tabNames[hash as keyof typeof tabNames]);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    // Update the URL hash without reloading the page
    window.history.replaceState(
      null,
      "",
      `#${Object.keys(tabNames).find((key) => tabNames[key as keyof typeof tabNames] === value)}`
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 pb-4">
      <div className="p-8">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="mb-8 w-full">
            <TabsTrigger value={tabNames.sonner}>Sonner</TabsTrigger>
            <TabsTrigger value={tabNames.alert}>Alert</TabsTrigger>
            <TabsTrigger value={tabNames.button}>Button</TabsTrigger>
          </TabsList>
          <TabsContent value={tabNames.sonner}>
            <SonnerDemo />
          </TabsContent>
          <TabsContent value={tabNames.alert}>
            <AlertDemo />
          </TabsContent>
          <TabsContent value={tabNames.button}>
            <ButtonDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
