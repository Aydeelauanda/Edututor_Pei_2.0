import { FC } from 'react'
import { useState } from 'react'
import {
  LogOut, LayoutDashboard, Users, BookOpen,
  Calendar, Bell, Search, Settings, CheckCircle2,
  ChevronRight, TrendingUp, Menu, X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import logoImg from '@/assets/images/edututor_logo.jpeg';
import { StudentsView } from './StudentsView';
import { ManagementView } from './ManagementView';
import { DisciplineView } from './DisciplineView';
import { SettingsView } from './SettingsView';
import { ReportsView } from './ReportsView';

import styles from './Dashboard.module.css';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

type ViewState = 'dashboard' | 'students' | 'management' | 'discipline' | 'reports' | 'settings';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) onLogout();
  };

  const stats = [
    { label: 'Alunos Ativos', value: '32', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'PEIs Concluídos', value: '18', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pendências', value: '05', icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'students':
        return <StudentsView />;
      case 'management':
        return <ManagementView />;
      case 'discipline':
        return <DisciplineView />;
      case 'settings':
        return <SettingsView />;
      case 'reports':
        return <ReportsView />;
      case 'dashboard':
      default:
        return (
          <>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bem-vindo, Tutor!</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Hoje é um ótimo dia para transformar vidas.</p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="w-full md:w-72 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/20 dark:focus:border-primary/40 transition-all font-medium dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-700 hidden sm:flex">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{user?.email?.split('@')[0]}</p>
                    <p className="text-[10px] font-bold text-success uppercase tracking-widest mt-1">Sessão Ativa</p>
                  </div>
                  <div className="size-11 rounded-2xl bg-primary/5 dark:bg-primary/20 border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center text-primary font-black text-lg">
                    {user?.email?.[0].toUpperCase()}
                  </div>
                </div>
              </div>
            </header>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 md:p-7 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-6 hover:shadow-md transition-all cursor-default group">
                  <div className={`size-16 rounded-[1.5rem] ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Grid Principal de Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700 min-h-[500px]">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Atividades Pendentes</h2>
                  <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-2 border-primary/10 px-4 py-2 rounded-full hover:bg-primary/5 transition-colors">Ver histórico</button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Arthur Silva', type: 'Revisão Trimestral', time: '14:00', status: 'Hoje' },
                    { name: 'Beatriz Costa', type: 'Planejamento Inicial', time: '16:30', status: 'Hoje' },
                    { name: 'Caio Mendes', type: 'Ajuste de Metas', time: '09:00', status: 'Amanhã' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 group gap-4 sm:gap-0">
                      <div className="flex items-center gap-5">
                        <div className="size-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center font-black text-primary border border-slate-100 dark:border-slate-700 text-xl">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-lg group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic">{item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.status}</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{item.time}h</p>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 dark:text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-primary/30 flex flex-col">
                <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-black text-white leading-tight mb-4">Métricas de <br />Desempenho</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                  Sua produtividade aumentou 12% em comparação ao mês passado. Ótimo trabalho!
                </p>
                <div className="mt-auto pt-10 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Taxa de Sucesso</p>
                      <p className="text-4xl font-black text-white">92.4%</p>
                    </div>
                    <div className="h-20 w-32 flex items-end gap-1.5">
                      {[30, 50, 40, 70, 90].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/20 rounded-t-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-slate-800 dark:text-white">EduTutor PEI</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Lateral */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className="p-8 relative">
          {/* Close Button Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 lg:hidden"
          >
            <X size={20} />
          </button>

          {/* Container do Logo - Centralizado e com espaçamento */}
          <div className="flex items-center justify-center mb-12">
            <img
              src={logoImg}
              alt="EduTutor PEI Logo"
              className={styles.image}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'students', icon: Users, label: ' Alunos' },
              { id: 'management', icon: Users, label: 'Gerenciamento' },
              { id: 'discipline', icon: BookOpen, label: 'Disciplina' },
              { id: 'reports', icon: TrendingUp, label: 'Relatórios' },
              { id: 'settings', icon: Settings, label: 'Ajustes' },
            ].map((item: any, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveView(item.id as ViewState);
                  setSidebarOpen(false); // Close sidebar on selection (mobile)
                }}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-sm transition-all group ${activeView === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white'}`}
              >
                <item.icon size={18} className={activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-primary dark:group-hover:text-white'} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-100 dark:border-slate-700">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Versão do App</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">v2.4.0 stable</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 font-bold text-sm hover:text-red-500 transition-colors w-full p-2"
          >
            <LogOut size={18} />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};