import { SidebarProvider } from "@/lib/store/sidebarContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>{children}</SidebarProvider>
    </>
  );
}
