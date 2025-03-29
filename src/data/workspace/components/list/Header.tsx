import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkspaceListHeader() {
  return (
    <header className="my-2 flex flex-col items-center justify-start gap-4 md:flex-row md:justify-between">
      <h3>Workspace List</h3>
      <Link href={`/workspace/create`}>
        <Button variant="outline">Create Workspace</Button>
      </Link>
    </header>
  );
}
