import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";

export default function Auth({ className }:{ className?: string}) {
  return (
    <div className={className}>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="secondary"
            className="w-full max-w-[100px] hover:bg-teal-700 hover:text-teal-100 bg-teal-100 text-teal-700"
          >
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button
            variant="secondary"
            className="w-full max-w-[100px] hover:bg-sky-700 hover:text-sky-100 bg-sky-100 text-sky-700"
          >
            Register
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          fallback={<Skeleton className="w-6 h-6 rounded-full bg-slate-600" />}
        />
      </SignedIn>
    </div>
  );
}
