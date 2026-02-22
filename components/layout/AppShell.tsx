"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Header } from "@/components/layout/Header";
import { useUIStore } from "@/store/uiStore";

export function AppShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const hydrate = useUIStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <div className="hidden md:block">{sidebar}</div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64">
            {sidebar}
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex flex-col">
          <Header onMobileMenu={() => setOpen(true)} />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}