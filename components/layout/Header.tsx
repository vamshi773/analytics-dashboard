"use client";

import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUIStore } from "@/store/uiStore";

export function Header({ onMobileMenu }: { onMobileMenu: () => void }) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const setCollapsed = useUIStore((s) => s.setSidebarCollapsed);

  return (
    <header className="flex items-center justify-between border-b bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="text-sm text-muted-foreground">Admin Dashboard</div>
      </div>

      <div className="flex items-center gap-2 w-[55%] max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search..." />
        </div>

        <Button variant="ghost" size="icon" title="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}