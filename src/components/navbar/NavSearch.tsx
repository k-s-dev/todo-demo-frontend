"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";

export const NavSearch: React.FC<InputProps> = ({ className, ...rest }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("query")?.toString() || "",
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`/dashboard?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("query")) {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <Input
      type="search"
      placeholder="search ..."
      className={cn(
        "placeholder:text-black border-slate-600 dark:placeholder:text-white dark:border-slate-100",
        className,
      )}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
      {...rest}
    />
  );
}

export default function NavSearchSuspense({ className, ...rest }: InputProps) {
  return (
    <div id="nav-search">
      <Suspense>
        <NavSearch className={className} {...rest} />
      </Suspense>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string,
}
