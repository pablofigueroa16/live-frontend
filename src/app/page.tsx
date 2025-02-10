import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-foreground/90">
          Video Chat
        </h1>
        <Link href="/room">
          <button className="px-8 py-4 text-lg font-medium text-background bg-foreground/90 rounded-lg 
            hover:bg-foreground/70 transition-colors duration-200 
            shadow-lg hover:shadow-xl">
            Crear o unirse a una sala
          </button>
        </Link>
      </div>
    </div>
  );
}
