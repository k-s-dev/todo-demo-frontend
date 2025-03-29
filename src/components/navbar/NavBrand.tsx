import Link from "next/link";
import { FaBullseye } from "react-icons/fa6";

export default function NavBrand({ className }: { className?: string }) {
  return (
    <article id="nav-links-brand" className={className}>
      <Link href="/">
        <FaBullseye className="w-6 h-6 hover:text-orange-600" />
      </Link>
    </article>
  );
}
