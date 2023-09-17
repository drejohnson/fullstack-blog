import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen py-8 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="flex justify-center text-2xl font-semibold">
          <span className="mt-1 tracking-wider">UrFi</span>
        </h1>
        <h1 className="text-5xl text-center text-gray-800 dark:text-gray-100 font-bold">
          Next Themes + Tailwind Dark Mode
        </h1>
        <p className="italic text-2xl">with app-dir</p>

        <ThemeToggle />
      </div>
    </div>
  );
}
