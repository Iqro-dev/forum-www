import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center pt-4">
        <Link href="/login">
          <Button>Log in</Button>
        </Link>
      </div>
    </main>
  );
}
