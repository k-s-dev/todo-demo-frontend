import Link from "next/link";

export default function Intro() {
  return (
    <section className="grid justify-center py-4 border-b">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-5xl px-2 text-center">
        <h1 className="font-bold text-4xl tracking-wide sm:text-6xl">
          A <span className="text-lime-800">Todo App</span> demo built using
          {"  "}
          <span className="text-lime-800 underline hover:text-cyan-800">
            <Link href="https://nextjs.org/">Nextjs</Link>
          </span>
        </h1>
        <p className="max-w-xs mt-8 text-lg leading-8 text-muted-foreground">
          To view and test all features, sign in using dummy account (
          <i>
            username: <b>demo</b>, password: <b>12345678</b>
          </i>
          ) or register to sign in.
        </p>
      </div>
    </section>
  );
}
