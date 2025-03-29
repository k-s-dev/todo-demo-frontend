import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status } from "./definitions";
import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function StatusTable({
  statuses,
  workspaceId,
}: {
  statuses: Status[];
  workspaceId: number;
}) {
  return (
    <article className="border rounded-2xl shadow shadow-gray-500 px-2">
      <header className="my-2 flex flex-col justify-start items-start md:justify-between md:flex-row gap-4">
        <h5>Statuses</h5>
        <Link href={`/status/create?workspaceId=${workspaceId}`}>
          <Button variant="outline">Create Status</Button>
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
          {statuses.map((obj) => {
            return (
              <StatusRow
                key={obj.id}
                status={obj}
              />
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}

function StatusRow({
  status,
}: {
  status: Status;
}) {
  return (
    <TableRow key={status.id}>
      <TableCell>
        <Link href={`/status/${status.id}`} className="underline">
          {status.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/status/${status.id}/update`}>
          <FaPencil />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/status/${status.id}/delete`}>
          <FaTrash />
        </Link>
      </TableCell>
    </TableRow>
  );
}
