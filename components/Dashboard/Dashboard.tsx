import React from 'react';
import { 
  LogOut, LayoutDashboard, Users, BookOpen, 
  Calendar, Bell, Search, Settings, CheckCircle2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import styles from './Dashboard.module.css';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-black text-primary text-xl italic tracking-tighter">EduTutor<span className="text-secondary">PEI</span></span>
          </div>

          <nav className="space-y-2">
            {[
              { icon: LayoutDashboard, label: 'Geral', active: true },
              { icon: Users, label: 'Alunos' },
              { icon: BookOpen, label: 'PEIs' },
              { icon: Calendar, label: 'Agenda' },
              { icon: Settings, label: 'Configurações' },
            ].map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 font-bold text-sm hover:text-red-500 transition-colors w-full"
          >
            <LogOut size={18} />
            Sair do sistema
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Olá, Tutor!</h1>
            <p className="text-slate-500 text-sm font-medium">Você tem 3 PEIs pendentes para hoje.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>
            <button className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 relative transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-none">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Coordenador</p>
              </div>
              <div className="size-10 rounded-xl bg-primary/10 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-primary font-black">
                {user?.email?.[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Alunos Ativos', value: '24', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'PEIs Pendentes', value: '03', icon: BookOpen, color: 'text-warning', bg: 'bg-warning/10' },
            { label: 'Meta Mensal', value: '88%', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className={`size-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900">Acompanhamento Semanal</h2>
            <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-primary border border-slate-100">
                    {String(i).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Aluno Exemplo {i}</p>
                    <p className="text-xs text-slate-500 font-medium italic">Plano Educacional Individualizado</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-black text-primary uppercase tracking-tighter">Hoje</p>
                    <p className="text-xs text-slate-500 font-bold">14:30h</p>
                  </div>
                  <div className="size-2 rounded-full bg-warning animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};