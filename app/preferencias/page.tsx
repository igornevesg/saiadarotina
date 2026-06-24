import AppButton from "@/components/AppButton";
import MobileShell from "@/components/MobileShell";

const levels = ["Romântico", "Picante", "Ousado", "Avançado"];

export default function PreferenciasPage() {
  return (
    <MobileShell>
      <h1 className="text-3xl font-bold">Seu limite</h1>
      <p className="mt-2 text-white/65">
        Escolha até qual nível você deseja visualizar.
      </p>

      <div className="mt-8 space-y-3">
        {levels.map((level) => (
          <button
            key={level}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left font-semibold"
          >
            {level}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AppButton href="/explorar">Começar a explorar</AppButton>
      </div>
    </MobileShell>
  );
}