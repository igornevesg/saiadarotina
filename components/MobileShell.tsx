type MobileShellProps = {
  children: React.ReactNode;
};

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <main className="min-h-screen bg-[#160813] px-5 py-6">
      <div className="mx-auto min-h-[calc(100vh-48px)] max-w-md rounded-[32px] border border-white/10 bg-gradient-to-b from-[#311225]

via-[#241020]

to-[#160813] p-5 shadow-2xl">
        {children}
      </div>
      <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
    </main>
  );
}