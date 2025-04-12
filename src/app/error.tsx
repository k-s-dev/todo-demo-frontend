"use client";

export default function error() {
  return (
    <main className="container">
      <div className="flex justify-center items-center my-8">
        <p className="font-bold text-amber-700 dark:text-amber-400">
          Internal server error, refresh to try again.
        </p>
      </div>
    </main>
  );
}
