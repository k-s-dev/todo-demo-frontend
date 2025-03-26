import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="w-screen grid relative">
      <Skeleton className="absolute top-[10vh] left-[20vw] lg:left-[50vw] w-[50px] h-[50px] bg-teal-600 rounded-full" />
    </div>
  );
}
