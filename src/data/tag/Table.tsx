import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag } from "./definitions";
import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function TagTable({
  tags,
  workspaceId,
}: {
  tags: Tag[];
  workspaceId: number;
}) {
  return (
    <article className="border rounded-2xl shadow shadow-gray-500 px-2">
      <header className="my-2 flex flex-col justify-start items-start md:justify-between md:flex-row gap-4">
        <h5>Tags</h5>
        <Link href={`/tag/create?workspaceId=${workspaceId}`}>
          <Button variant="outline">Create Tag</Button>
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
          {tags.map((obj) => {
            return (
              <TagRow
                key={obj.id}
                tag={obj}
              />
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}

function TagRow({
  tag,
}: {
  tag: Tag;
}) {
  return (
    <TableRow key={tag.id}>
      <TableCell>
        <Link href={`/tag/${tag.id}`} className="underline">
          {tag.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/tag/${tag.id}/update`}>
          <FaPencil />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/tag/${tag.id}/delete`}>
          <FaTrash />
        </Link>
      </TableCell>
    </TableRow>
  );
}
