import { ModeToggle } from "./components/mode-toggle";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col w-full justify-center">
        <ModeToggle />
        <h1 className="text-4xl">Welcome</h1>
      </div>
    </main>
  );
}
