"use client";

import { useEffect, useState } from "react";

export function MultipleSelect({
  children,
  id,
  name,
  initialValue,
  form,
  disabled = false,
    size = 4,
}: {
  children: React.ReactNode;
  id: string;
  name: string;
  initialValue?: string[];
  form?: string;
  disabled?: boolean;
  size?: number;
}) {
  const [selection, setSelection] = useState<string[]>(initialValue || []); // Declare a state variable...

  useEffect(() => {
    setSelection(initialValue || []);
  }, [initialValue]);
  // ...
  return (
    <select
      multiple={true}
      value={selection} // ...force the select's value to match the state variable...
      onChange={(e) => {
        const options = [...e.target.selectedOptions];
        const values = options.map((option) => option.value);
        setSelection(values);
      }}
      id={id}
      name={name}
      form={form}
      disabled={disabled}
      size={size}
      className="border rounded-sm p-1 w-full"
    >
      {children}
    </select>
  );
}
