import { FC, useState, useEffect } from 'react'
import {
  LogOut, LayoutDashboard, Users, BookOpen,
  Calendar, Bell, Search, Settings, CheckCircle2,
  ChevronRight, TrendingUp, Menu, X, Filter,
  ArrowUpRight, Clock, MessageSquare, Briefcase,
  ChevronLeft, ClipboardList, Lightbulb, Target
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import logoIcon from '@/assets/images/logo_vinculo.jpeg';
import { StudentsView } from './Students/StudentsView';
import { ManagementView } from './Management/ManagementView';
import { DisciplineView } from './Discipline/DisciplineView';
import { SettingsView } from './Settings/SettingsView';
import { ReportsView } from './Reports/ReportsView';

import styles from './Dashboard.module.css';
import { div, section } from 'framer-motion/client';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

type ViewState = 'dashboard' | 'students' | 'management' | 'discipline' | 'reports' | 'settings';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());




  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) onLogout();
  };

  const stats = [
    { label: 'Alunos Ativos', value: '32', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'Total' },
    { label: 'PEIs Concluídos', value: '18', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12%' },
    { label: 'Atendimentos Hoje', value: '12', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50', trend: 'Hoje' },
    { label: 'Média Alunos/Turma', value: '08', icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Estável' },
    { label: 'Taxa de Ativos', value: '94%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5', trend: 'KPI' },
    { label: 'Pendência', value: '05', icon: Bell, color: 'text-red-500', bg: 'bg-red-50', trend: 'Atenção' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'students': return <StudentsView />;
      case 'management': return <ManagementView />;
      case 'discipline': return <DisciplineView />;
      case 'settings': return <SettingsView />;
      case 'reports': return <ReportsView />;
      case 'dashboard':
      default:
        return (
          <div className="animate-in fade-in duration-700">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  Olá, EduTutorPei! <span className="text-4xl">👋</span>
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                    Visão geral completa do sistema educacional.
                  </p>
                  <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></span>
                  <div className="flex items-center gap-2 text-primary dark:text-blue-400 text-xs font-bold bg-primary/5 dark:bg-blue-400/10 px-3 py-1 rounded-full">
                    <Clock size={12} />
                    {formatDateTime(currentTime)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full xl:w-auto">
                <div className="relative group flex-1 xl:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="Pesquisar em todo o sistema..."
                    className="w-full xl:w-80 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 dark:focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-medium dark:text-white"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                    <kbd className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-sans border border-slate-200">⌘</kbd>
                    <kbd className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-sans border border-slate-200">K</kbd>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block mx-2"></div>

                <button className="relative p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary transition-all">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
              </div>
            </header>

            {/* Grid de Estatísticas Refinado - Agora com 6 itens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all group overflow-hidden relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`size-12 rounded-2xl ${stat.bg} ${stat.color} dark:bg-slate-700/50 flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <stat.icon size={22} />
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">{stat.label}</h3>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.1] group-hover:scale-125 transition-transform duration-700">
                    <stat.icon size={100} />
                  </div>
                </div>
              ))}
            </div>

            {/* Seções Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700/50">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Atividades Pendentes</h2>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Você tem 3 tarefas importantes hoje</p>
                  </div>
                  <button className="text-xs font-black text-primary hover:text-secondary uppercase tracking-widest transition-colors flex items-center gap-2">
                    Ver histórico completo <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Arthur Silva', type: 'Revisão Trimestral', time: '14:00', status: 'Em 2 horas', priority: 'high' },
                    { name: 'Beatriz Costa', type: 'Planejamento Inicial', time: '16:30', status: 'Hoje', priority: 'medium' },
                    { name: 'Caio Mendes', type: 'Ajuste de Metas', time: '09:00', status: 'Amanhã', priority: 'low' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl bg-slate-50/50 dark:bg-slate-700/20 hover:bg-white dark:hover:bg-slate-700/40 border border-transparent hover:border-slate-100 dark:hover:border-slate-600 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="size-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-black text-primary border border-slate-100 dark:border-slate-600">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-all">{item.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between border-t sm:border-t-0 border-slate-100 dark:border-slate-700 pt-4 sm:pt-0">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{item.time}h</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                          item.priority === 'medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                          {item.status}
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary dark:bg-primary/80 p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="size-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight mb-4">Métricas de <br />Engajamento</h3>
                  <p className="text-white/70 text-sm font-medium leading-relaxed mb-auto">
                    A produtividade média da sua turma subiu 15% esta semana.
                  </p>

                  <div className="pt-8 mt-12 border-t border-white/10">
                    <div className="flex justify-between items-end gap-4">
                      <div className="h-24 flex-1 flex items-end gap-1.5">
                        {[40, 60, 45, 80, 100].map((h, i) => (
                          <div key={i} className="flex-1 group/bar relative">
                            <div
                              style={{ height: `${h}%` }}
                              className="w-full bg-white/20 rounded-t-lg group-hover/bar:bg-white/40 transition-all duration-500"
                            />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[10px] font-bold text-white">
                              {h}%
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Média Global</p>
                        <p className="text-4xl font-black text-white tracking-tighter">88%</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Abstract shape background */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 size-64 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Tabela de Relatórios Refinada */}
            <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden mb-12">
              <div className="p-8 border-b border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    Relatório Semestral de Evolução
                    <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-md border border-primary/10">Para Família e Convênio</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Acompanhamento semestral de evolução pedagógica</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-400 hover:border-primary transition-all uppercase tracking-widest">
                    <Filter size={14} /> Filtros
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl text-xs font-black hover:bg-secondary transition-all shadow-lg shadow-primary/20 uppercase tracking-widest">
                    Exportar tudo
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/40">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aluno / Identificação</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso por Área</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Geral</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status / Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                    {[
                      {
                        name: 'Aline Cely Araujo',
                        id: 'SH-229',
                        period: 'Jul/2025 - Jan/2026',
                        progress: 85,
                        tags: ['Acadêmica', 'Social'],
                        qualitative: 'Demonstrou grande evolução na comunicação verbal e autonomia nas atividades de rotina escolar.',
                        inclusaoNote: 'Necessário reforçar o apoio visual em atividades de alfabetização.',
                        nextGoal: 'Consolidar a escrita do próprio nome e letras iniciais.',
                        goals: 'Autonomia diária'
                      },
                      {
                        name: 'Lucas Gabriel Souza',
                        id: 'SH-312',
                        period: 'Ago/2025 - Dez/2025',
                        progress: 72,
                        tags: ['Inclusão'],
                        qualitative: 'Melhorou a regulação emocional em ambientes com estímulos sonoros elevados.',
                        inclusaoNote: 'Uso de abafadores recomendado em festas e eventos da escola.',
                        nextGoal: 'Reduzir o tempo de mediação individual em 30%.',
                        goals: 'Redução mediadores'
                      },
                      {
                        name: 'Mariana Lima',
                        id: 'SH-105',
                        period: 'Set/2025 - Jan/2026',
                        progress: 94,
                        tags: ['Social', 'Linguagem'],
                        qualitative: 'Excelente interação com os pares durante os períodos de recreio dirigido.',
                        inclusaoNote: 'Estimular a liderança em pequenos grupos de trabalho.',
                        nextGoal: 'Aumentar o vocabulário expressivo em temas abstratos.',
                        goals: 'Interação grupal'
                      },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors cursor-pointer group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-500 text-xs">
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID {item.id} • {item.period}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded-lg border border-blue-100/50 dark:border-blue-500/20">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Target size={12} className="text-emerald-500" />
                              <span className="text-[10px] uppercase font-black tracking-tight">Meta: {item.nextGoal}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ClipboardList size={12} className="text-primary" />
                              <span className="text-[10px] uppercase font-black tracking-tight">Qualitativo: {item.qualitative.substring(0, 30)}...</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-between gap-4">
                            <div className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-lg">
                              <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase">Inclusão: {item.inclusaoNote.substring(0, 20)}...</span>
                            </div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all">
                              <ChevronRight size={16} className="text-slate-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação Refinada */}
              <div className="p-8 border-t border-slate-100 dark:border-slate-700/30 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    Página 1 de 4
                    <span className="size-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                    12 Registros
                  </div>

                  {/* Slider Premium de Navegação */}
                  <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Acesso Rápido</span>
                    <div className="relative w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full group/slider">
                      <div className="absolute top-0 left-0 h-full w-1/4 bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]"></div>
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 size-3.5 bg-white dark:bg-slate-800 border-2 border-primary rounded-full shadow-lg shadow-primary/20 cursor-pointer hover:scale-125 transition-all"></div>
                    </div>
                    <span className="text-[10px] font-bold text-primary">25%</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <button className="p-2 text-slate-400 hover:text-primary transition-all disabled:opacity-20 disabled:cursor-not-allowed" disabled>
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((page) => (
                      <button
                        key={page}
                        className={`size-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${page === 1
                          ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:shadow-sm'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button className="p-2 text-slate-400 hover:text-primary transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </section>

            {/* Nova Seção: Orientações para Escola */}
            <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              <div className="p-8 border-b border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    Orientações para Escola
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] rounded-md border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">Relatório de Inclusão</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Diretrizes pedagógicas e adaptações curriculares</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-400 hover:border-primary transition-all uppercase tracking-widest">
                    <Filter size={14} /> Filtro
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl text-xs font-black hover:bg-secondary transition-all shadow-lg shadow-primary/20 uppercase tracking-widest">
                    Como Exportar
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/40">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Paciente</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Período</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resultados Qualitativos</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metas para Próximo Semestre</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                    {[
                      {
                        patient: 'Enzo Rodrigues',
                        period: '2º Semestre 2025',
                        qualitative: 'Melhora significativa na permanência sentado e engajamento em tarefas coletivas.',
                        nextGoal: 'Ampliar a interação verbal com colegas durante o lanche.'
                      },
                      {
                        patient: 'Helena Oliveira',
                        period: '2º Semestre 2025',
                        qualitative: 'Desenvolveu estratégias de autorregulação eficazes para transições de ambiente.',
                        nextGoal: 'Introduzir suportes visuais para resolução de problemas matemáticos.'
                      }
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors cursor-pointer group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center font-black text-emerald-600 text-xs">
                              {item.patient.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.patient}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                          {item.period}
                        </td>
                        <td className="px-8 py-6 max-w-xs">
                          <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                            {item.qualitative}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <div className="size-1.5 bg-primary rounded-full"></div>
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.nextGoal}</span>
                            </div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all">
                              <ChevronRight size={16} className="text-slate-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação Refinada para Escola */}
              <div className="p-8 border-t border-slate-100 dark:border-slate-700/30 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    Exibido 1 - de 15
                    <span className="size-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                    Orientações Ativas
                  </div>

                  {/* Slider Premium de Navegação */}
                  <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Navegação Rápida</span>
                    <div className="relative w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full group/slider">
                      <div className="absolute top-0 left-0 h-full w-[20%] bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"></div>
                      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 size-3.5 bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-full shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-125 transition-all"></div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500">20%</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <button className="p-2 text-slate-400 hover:text-emerald-500 transition-all disabled:opacity-20 disabled:cursor-not-allowed" disabled>
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        className={`size-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${page === 1
                          ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-105'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-emerald-500 hover:shadow-sm'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                    <span className="px-2 text-slate-300">...</span>
                    <button className="size-9 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all">5</button>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-emerald-500 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Mobile Header Refinado */}
      <div className={styles.mobileHeader}>
        <div className="flex items-center gap-3">
          <div className="size-14 bg-primary rounded-2xl flex items-center justify-center p-1.5 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
            <div className="size-full bg-white rounded-xl flex items-center justify-center overflow-hidden">
              <img src={logoIcon} alt="Logo" className="size-full object-contain scale-110" />
            </div>
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white tracking-tight uppercase text-xs">EduTutor PEI</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay Glass */}
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar de Alto Nível */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 pb-4">
            {/* Header Sidebar */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="size-16 rounded-[1.5rem] bg-primary flex items-center justify-center p-2 shadow-xl shadow-primary/20 transition-transform hover:scale-105">
                  <div className="size-full bg-white rounded-[1.25rem] flex items-center justify-center overflow-hidden">
                    <img src={logoIcon} alt="Logo Icon" className="size-full object-contain scale-200" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white tracking-tighter text-lg leading-tight">EduTutor</span>
                  <span className="text-[10px] font-black text-primary dark:text-blue-400 uppercase tracking-widest leading-none">Plataforma PEI</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-red-500 lg:hidden rounded-xl hovrer:bg-slate-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Principal */}
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Navegação</p>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'students', icon: Users, label: 'Alunos' },
                { id: 'management', icon: Briefcase, label: 'Gerenciamento' },
                { id: 'reports', icon: TrendingUp, label: 'Relatórios' },
              ].map((item: any, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveView(item.id as ViewState);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-sm transition-all group overflow-hidden relative ${activeView === item.id
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3.5 relative z-10">
                    <item.icon size={18} className={`${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors'}`} />
                    {item.label}
                  </div>
                  {activeView === item.id && <ChevronRight size={14} className="opacity-50" />}
                </button>
              ))}
            </nav>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-8 mb-4 ml-2">Suporte & App</p>
            <nav className="space-y-1">
              {[
                { id: 'settings', icon: Settings, label: 'Ajustes' },
                { id: 'help', icon: MessageSquare, label: 'Central de Ajuda' },
              ].map((item: any, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (item.id !== 'help') setActiveView(item.id as ViewState);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all group ${activeView === item.id
                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary dark:hover:text-white'
                    }`}
                >
                  <item.icon size={18} className={`${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 pt-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-[2rem] mb-6 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status do Sistema</p>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-success rounded-full animate-pulse"></div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">v2.4.0 • Online</p>
                </div>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 text-slate-200 dark:text-slate-700 group-hover:text-primary transition-colors" size={16} />
            </div>

            <div className="flex items-center gap-4 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group mb-4">
              <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-black">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] font-bold text-success uppercase tracking-widest">Premium Plan</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-slate-500 font-bold text-sm hover:text-red-500 transition-all w-full p-3 rounded-2xl mt-2 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Encerrar Sessão
            </button>
          </div>
        </div>
      </aside>

      {/* Área de Conteúdo Principal Refinada */}
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};