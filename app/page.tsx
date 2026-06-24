import AppButton from "@/components/AppButton";
import MobileShell from "@/components/MobileShell";

export default function Home() {
  return (
    <MobileShell>
      <section className="flex min-h-[calc(100vh-88px)] flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 border border-white/10">
  🔒 Privado • +18
</div>

<div className="mb-6 flex justify-center">

  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-500/15 text-4xl">

    <img src="./public/image-removebg-preview-26.png" alt="" />

  </div>

</div>

         <h1 className="text-center text-6xl font-bold leading-none">
  Saia da
  <br />
  <span className="text-pink-400">Rotina</span>
</h1>

          <p className="mx-auto mt-6 max-w-xs text-center text-lg text-white/70">
  Descubram desejos, experiências e momentos que combinam com o relacionamento de vocês.
</p>
        </div>

        <div className="mt-10 space-y-3">

  <div>✓ Respostas privadas</div>

  <div>✓ Apenas interesses em comum</div>

  <div>✓ Sugestões para sair da rotina</div>

</div>



<div className="mt-10 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
  Mais de 500 experiências para descobrir juntos.
  <p className="text-pink-300 font-medium">
    ❤️ Experiência em comum
  </p>

  <p className="mt-2 text-white font-semibold">
    

Noite de massagem relaxante
  </p>

  <p className="mt-2 text-sm text-white/60">
    → Veja como funciona
  </p>
</div>

        <div className="space-y-3 mt-8">
          <AppButton href="/criar">Criar espaço do casal</AppButton>
          <AppButton href="/entrar" variant="secondary">
            Já tenho um código
          </AppButton>

          <p className="pt-3 text-center text-xs text-white/45 pb-10">
            Suas respostas individuais não são reveladas. O app mostra apenas o
            que combina com os dois.
          </p>
        </div>
      </section>
    </MobileShell>
  );
}