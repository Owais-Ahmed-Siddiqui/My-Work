import { useState } from 'react';
import { useApp } from '../lib/store';
import { toast } from 'sonner';

export default function AuthScreen() {
  const login = useApp(s=>s.login);
  const [email, setEmail] = useState('owais@flowboard.dev');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login(email);
    toast.success('Welcome back to Flowboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-zinc-800 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full blur-[150px] opacity-[.22]" style={{background:'radial-gradient(circle,#ffc090, #b798ff, #77c5ff)'}}/>
      <div className="w-full max-w-[1120px] grid md:grid-cols-[1.1fr_.95fr] gap-10 items-center relative z-10">
        <div className="px-2 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-[16px] bg-zinc-900 text-white flex items-center justify-center shadow-lg shadow-zinc-300 font-[700] text-[17px]">∿</div>
            <div>
              <div className="font-[700] text-[18px] tracking-tight">Flowboard</div>
              <div className="text-[12.5px] text-zinc-500 -mt-0.5">by Owais Ahmed</div>
            </div>
          </div>
          <h1 className="text-[54px] leading-[1.03] font-[800] tracking-[-0.03em] text-zinc-900">
            Teamwork,<br/>but actually<br/>pleasant.
          </h1>
          <p className="text-[18px] text-zinc-600 mt-5 max-w-[450px] leading-relaxed">
            A Trello-meets-Asana workspace with a social pulse. Boards, tasks, comments, realtime—crafted warmly.
          </p>
          <div className="flex flex-wrap gap-6 mt-10 text-[13.5px] text-zinc-600">
            <span className="flex items-center gap-2"><b className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] flex items-center justify-center">✓</b> Kanban + List</span>
            <span className="flex items-center gap-2"><b className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] flex items-center justify-center">✓</b> Realtime WS</span>
            <span className="flex items-center gap-2"><b className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] flex items-center justify-center">✓</b> Activity feed</span>
          </div>
          <div className="mt-10 text-[12.5px] text-zinc-500">
            Open source • <a className="underline hover:text-zinc-800" href="https://github.com/Owais-Ahmed-Siddiqui" target="_blank" rel="noreferrer">github.com/Owais-Ahmed-Siddiqui</a>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-[30px] shadow-[0_40px_100px_rgba(80,55,40,0.16)] border border-zinc-200/80 p-9 md:p-[44px]">
            <div className="text-[13px] text-zinc-500 mb-2">Sign in to your workspace</div>
            <h2 className="text-[28px] font-[750] tracking-[-0.015em] text-zinc-900 mb-6">Welcome back</h2>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-[12.5px] text-zinc-600">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                  className="mt-1.5 w-full bg-[#f5f2ef] border border-zinc-200 rounded-[14px] px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#6d5cf7]/30 text-[15px]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <div className="flex justify-between text-[12.5px] text-zinc-600">
                  <span>Password</span><span className="text-zinc-400">Anything works in demo</span>
                </div>
                <input type="password" defaultValue="••••••••"
                  className="mt-1.5 w-full bg-[#f5f2ef] border border-zinc-200 rounded-[14px] px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#6d5cf7]/30 text-[15px]"
                />
              </div>
              <button disabled={loading}
                className="w-full mt-2 rounded-[14px] bg-zinc-900 text-white py-3.5 font-[640] hover:bg-zinc-800 transition disabled:opacity-60">
                {loading ? 'Signing in…' : 'Continue →'}
              </button>
            </form>
            <div className="flex items-center gap-3 my-6 text-[12.3px] text-zinc-400"><div className="h-px flex-1 bg-zinc-200"/> or <div className="h-px flex-1 bg-zinc-200"/></div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { login('owais@flowboard.dev'); toast.success('Signed in as Owais')}} className="py-3 rounded-[13px] border border-zinc-200 text-[13.5px] font-[580] hover:bg-zinc-50">Continue as Owais</button>
              <button className="py-3 rounded-[13px] border border-zinc-200 text-[13.5px] font-[580] hover:bg-zinc-50">Use Google</button>
            </div>
            <p className="text-[12.3px] text-zinc-500 mt-6 text-center">Demo is pre-seeded with 7 teammates, 4 projects, 12 tasks.</p>
          </div>
          <div className="absolute -bottom-10 -left-8 bg-[#fff2e6] border border-orange-200 rounded-2xl px-4 py-3 text-[12.6px] shadow-lg rotate-[-3deg]">Try: owais@flowboard.dev</div>
        </div>
      </div>
    </div>
  );
}
