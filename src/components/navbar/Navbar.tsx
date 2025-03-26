import { SignedIn, SignedOut } from "@clerk/nextjs";

import Auth from "./Auth";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavSearchSuspense from "./NavSearch";
import { ModeToggle } from "./ModeToggle";

export default async function Navbar() {
  return (
    <nav className="sticky top-0 z-10 m-0 border-b bg-white p-0 dark:bg-slate-600">
      <div
        id="nav-container"
        className="grid auto-cols-fr grid-flow-row items-center justify-between gap-4 px-2 py-3 sm:grid-flow-col"
      >
        <section
          id="nav-links-section"
          className="hidden sm:flex sm:flex-row sm:justify-start sm:gap-4"
        >
          <NavBrand />
          <NavLinks />
        </section>

        <SignedIn>
          <section
            id="nav-links-section"
            className="grid auto-cols-fr grid-flow-col items-center justify-between gap-4 px-0 py-4 sm:hidden"
          >
            <NavLinks />
            <NavBrand className="flex items-center justify-self-center" />

            <ModeToggle className="justify-self-end" />
            <Auth className="flex items-center justify-self-end" />
          </section>

          <NavSearchSuspense />

          <article className="hidden sm:flex sm:items-center sm:justify-end sm:gap-4">
            <ModeToggle />
            <Auth className="flex items-center" />
          </article>
        </SignedIn>

        <SignedOut>
          <section
            id="nav-links-section"
            className="flex flex-row items-center justify-between gap-4 py-4 sm:hidden"
          >
            <NavLinks />
            <NavBrand />
            <ModeToggle />
          </section>
          <Auth className="flex justify-between gap-4 sm:hidden" />
          <article className="hidden sm:items-center sm:justify-between sm:gap-4 sm:flex sm:justify-end sm:flex-wrap">
            <ModeToggle />
            <Auth className="sm:flex sm:justify-around sm:gap-4" />
          </article>
        </SignedOut>
      </div>
    </nav>
  );
}
