import AppButton from "@/components/AppButton";
import MobileShell from "@/components/MobileShell";

export default function EntrarPage() {
  return (
    <MobileShell>
      <h1 className="text-3xl font-bold">Entrar com código</h1>
      <p className="mt-2 text-white/65">
        Use o código enviado pelo seu parceiro ou parceira.
      </p>

      <div className="mt-8 space-y-4">
        <input className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 uppercase outline-none" placeholder="Ex: SDR-48291" />
        <input className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none" placeholder="Seu apelido" />

        <label className="flex gap-3 text-sm text-white/70">
          <input type="checkbox" />
          Confirmo que sou maior de 18 anos.
        </label>

        <AppButton href="/preferencias">Entrar no espaço</AppButton>
      </div>
    </MobileShell>
  );
}