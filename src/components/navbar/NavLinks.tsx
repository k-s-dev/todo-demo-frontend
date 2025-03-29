"use client";

import { nanoid } from "nanoid";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";

import { LinkType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks: LinkType[] = [
  { id: nanoid(), href: "/", text: "Home" },
  { id: nanoid(), href: "/dashboard", text: "Dashboard" },
  { id: nanoid(), href: "/workspace", text: "Workspaces" },
];

export default function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <>
      <div
        id="nav-links-list"
        className={cn(
          "hidden sm:items-center sm:flex sm:flex-row sm:justify-between sm:gap-2 sm:flex-wrap",
          className,
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`link ${pathname === link.href ? "text-orange-700 dark:text-orange-300" : ""}`}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div id="nav-links-list-sm" className="sm:hidden flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-slate-100 dark:bg-slate-400">
                <FaBars />
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                {navLinks.map((link) => (
                  <NavigationMenuLink
                    key={link.id}
                    asChild
                    active={pathname === link.href}
                  >
                    <Link
                      href={link.href}
                      className={`link ${pathname === link.href ? "text-orange-700 dark:text-orange-300" : ""}`}
                    >
                      {link.text}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
