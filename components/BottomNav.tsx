import Link from "next/link";

const items = [
  { href: "/explorar", label: "Explorar" },
  { href: "/criar-fantasia", label: "Criar" },
  { href: "/matches", label: "Matches" },
  { href: "/perfil", label: "Perfil" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 grid w-[calc(100%-32px)] max-w-md -translate-x-1/2 grid-cols-4 rounded-3xl border border-white/10 bg-[#241020]/95 p-2 backdrop-blur">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-2xl px-2 py-3 text-center text-xs font-medium text-white/80"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}