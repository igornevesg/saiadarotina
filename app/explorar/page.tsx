import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

export default function ExplorarPage() {
  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Explorar</p>
        <h1 className="mt-2 text-3xl font-bold">Ideias para vocês</h1>
        <p className="mt-2 text-white/60">
          Em breve, aqui vocês vão responder às experiências e descobrir matches em comum.
        </p>

        <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
          <p className="text-sm text-pink-300">Primeira sugestão</p>
          <h2 className="mt-2 text-2xl font-bold">Noite de massagem</h2>
          <p className="mt-3 text-white/65">
            Uma experiência leve para relaxar, criar conexão e sair da rotina.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Topo
            </button>
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Talvez
            </button>
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Não
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileShell>
  );
}