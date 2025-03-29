import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Priority } from "./definitions";
import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function PriorityTable({
  priorities,
  workspaceId,
}: {
  priorities: Priority[];
  workspaceId: number;
}) {
  return (
    <article className="border rounded-2xl shadow shadow-gray-500 px-2">
      <header className="my-2 flex flex-col justify-start items-start md:justify-between md:flex-row gap-4">
        <h5>Priorities</h5>
        <Link href={`/priority/create?workspaceId=${workspaceId}`}>
          <Button variant="outline">Create Priority</Button>
        </Link>
      </header>
      <Separator className="h-0.5! my-2" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priorities.map((obj) => {
            return (
              <PriorityRow
                key={obj.id}
                priority={obj}
              />
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}

function PriorityRow({
  priority,
}: {
  priority: Priority;
}) {
  return (
    <TableRow key={priority.id}>
      <TableCell>
        <Link href={`/priority/${priority.id}`} className="underline">
          {priority.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/priority/${priority.id}/update`}>
          <FaPencil />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/priority/${priority.id}/delete`}>
          <FaTrash />
        </Link>
      </TableCell>
    </TableRow>
  );
}
