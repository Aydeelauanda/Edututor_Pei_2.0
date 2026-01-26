import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, PieChart, Network, 
  LayoutDashboard, Users, School, 
  Target, BarChart3, ShieldCheck
} from 'lucide-react';
import styles from './VisualBanner.module.css';

interface Slide {
  id: number;
  headerTitle: string;
  title: React.ReactNode;
  desc: string;
  accent: string;
  glowColor: string;
  icon: React.ReactNode;
  type: 'dashboard' | 'analytics' | 'ecosystem';
}

const slides: Slide[] = [
  {
    id: 0,
    headerTitle: "Gestão Integrada",
    title: <>Gestão <span className="text-secondary">Integrada</span></>,
    desc: "Controle absoluto sobre o progresso pedagógico de cada unidade escolar.",
    accent: "bg-[#14396D]",
    glowColor: "rgba(20, 57, 109, 0.25)",
    icon: <LayoutDashboard size={22} />,
    type: 'dashboard'
  },
  {
    id: 1,
    headerTitle: "Análise Inteligente",
    title: <>Análise <span className="text-accent">Inteligente</span></>,
    desc: "Transformamos dados brutos em insights poderosos para o desenvolvimento do aluno.",
    accent: "bg-[#1B9195]",
    glowColor: "rgba(27, 145, 149, 0.25)",
    icon: <PieChart size={22} />,
    type: 'analytics'
  },
  {
    id: 2,
    headerTitle: "Conexão Total",
    title: <>Ecossistema <span className="text-warning">EduTutor</span></>,
    desc: "Unindo famílias e especialistas em uma jornada de ensino personalizada.",
    accent: "bg-[#EA695B]",
    glowColor: "rgba(234, 105, 91, 0.25)",
    icon: <Network size={22} />,
    type: 'ecosystem'
  }
];

export const VisualBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <aside className={styles.banner}>
      <div className={styles.gridOverlay}></div>
      <div 
        className={styles.meshGlow} 
        style={{ background: `radial-gradient(circle, ${activeSlide.glowColor} 0%, rgba(0, 8, 16, 0) 75%)` }}
      ></div>
      <div 
        className={`${styles.meshGlow} ${styles.meshGlowSecond}`}
        style={{ background: `radial-gradient(circle, ${activeSlide.glowColor} 0%, rgba(0, 8, 16, 0) 75%)` }}
      ></div>

      <div className="relative z-20 w-full flex flex-col items-center justify-center h-full px-8">
        <div className={styles.glassCard}>
          <div className="flex justify-between items-start mb-8">
             <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-700 ${activeSlide.accent}`}>
                  {activeSlide.icon}
                </div>
                <div className="text-left">
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-[0.25em] mb-0.5">INTELIGÊNCIA EDUCACIONAL</span>
                  <h4 className="text-white font-bold text-lg tracking-tight leading-none">{activeSlide.headerTitle}</h4>
                </div>
             </div>
             <div className="flex gap-2">
                <div className="size-2 rounded-full bg-slate-700/50"></div>
                <div className="size-2 rounded-full bg-slate-700/50"></div>
                <div className="size-2 rounded-full bg-slate-700/50"></div>
             </div>
          </div>

          <div className="relative flex items-center justify-center w-full min-h-[220px]">
            {activeSlide.type === 'dashboard' && (
              <div className="w-full grid grid-cols-2 gap-6 animate-in fade-in zoom-in duration-700">
                <div className="p-6 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-4">Total Alunos</p>
                  <p className="text-4xl font-black text-white tracking-tighter">1.4k</p>
                  <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-primary"></div>
                  </div>
                </div>
                <div className="p-6 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-4">Eficiência</p>
                  <p className="text-4xl font-black text-success tracking-tighter">94%</p>
                  <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-success"></div>
                  </div>
                </div>
              </div>
            )}

            {activeSlide.type === 'analytics' && (
              <div className="w-full flex items-center justify-center animate-in slide-in-from-bottom-8 duration-700">
                <div className="w-full max-w-sm p-6 rounded-[2.5rem] bg-white/[0.04] border border-white/10 flex items-center justify-between backdrop-blur-xl">
                  <div className="flex flex-col gap-1">
                    <p className="text-white font-bold text-xs">Crescimento Anual</p>
                    <p className="text-primary font-black text-3xl">+22%</p>
                  </div>
                  <div className="size-16 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
                </div>
              </div>
            )}

            {activeSlide.type === 'ecosystem' && (
              <div className="relative w-full h-[220px] flex items-center justify-center animate-in zoom-in duration-1000">
                <div className="absolute size-[200px] rounded-full border border-white/[0.05] flex items-center justify-center">
                  <div className="size-[140px] rounded-full border border-white/[0.1] flex items-center justify-center">
                    <Target className="text-warning/50" size={32} />
                  </div>
                </div>
                <div className="absolute top-0 text-slate-400 text-[10px] font-black uppercase">Família</div>
                <div className="absolute bottom-0 text-slate-400 text-[10px] font-black uppercase">Escola</div>
                <div className="absolute left-0 text-slate-400 text-[10px] font-black uppercase">Dados</div>
                <div className="absolute right-0 text-slate-400 text-[10px] font-black uppercase">Tutor</div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-md text-center mt-12 animate-in slide-in-from-top-2 duration-1000">
          <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-4">
            {activeSlide.title}
          </h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed px-6">
            {activeSlide.desc}
          </p>
        </div>

        <div className="absolute bottom-12 flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all duration-700 ${currentSlide === i ? 'w-10 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};