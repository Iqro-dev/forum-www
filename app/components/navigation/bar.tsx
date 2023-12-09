import { ModeToggle } from "../mode-toggle";
import { UserNav } from "./user-nav";

export function Navbar() {
  return (
    <header className="flex flex-row items-center justify-between top-0 sticky border-b border-border p-2">
      <span className="text-2xl font-semibold">Forum</span>

      <div className="flex flex-row gap-2 justify-center items-center">
        <UserNav />

        <ModeToggle />
      </div>
    </header>
  );
}
