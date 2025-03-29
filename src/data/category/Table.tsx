import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "./definitions";
import Link from "next/link";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function CategoryTable({
  categories,
  workspaceId,
}: {
  categories: Category[];
  workspaceId: number;
}) {
  return (
    <article className="border rounded-2xl shadow shadow-gray-500 px-2">
      <header className="my-2 flex flex-col justify-start items-start md:justify-between md:flex-row gap-4">
        <h5>Categories</h5>
        <Link href={`/category/create?workspaceId=${workspaceId}`}>
          <Button variant="outline">Create Category</Button>
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
          {categories.map((obj) => {
            return (
              <CategoryRow
                key={obj.id}
                category={obj}
              />
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}

function CategoryRow({
  category,
}: {
  category: Category;
}) {
  return (
    <TableRow key={category.id}>
      <TableCell>
        <Link href={`/category/${category.id}`} className="underline">
          {category.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/category/${category.id}/update`}>
          <FaPencil />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/category/${category.id}/delete`}>
          <FaTrash />
        </Link>
      </TableCell>
    </TableRow>
  );
}
