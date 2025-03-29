export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <main className="mx-auto grid max-w-3xl grid-cols-1 px-4">
      {children}
    </main>
  )
}
