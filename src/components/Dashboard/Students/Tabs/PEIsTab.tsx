
import { useState } from 'react';
import { Plus, History, FileCheck, ExternalLink, Calendar } from 'lucide-react';

interface PEIsTabProps {
    studentId: string;
    studentName: string;
    studentData: any;
    onOpenWizard: () => void;
}

export const PEIsTab = ({ studentId, studentName, studentData, onOpenWizard }: PEIsTabProps) => {

    const mockHistory = [
        { id: '1', version: 'PEI 2026 - v1', date: '30/01/2026', status: 'Ativo', creator: 'Dra. Mariana Costa' },
        { id: '2', version: 'PEI 2025 - Final', date: '15/12/2025', status: 'Arquivado', creator: 'Dr. Ricardo Mendes' },
    ];


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight italic">Histórico de <span className="text-primary">PEIs</span></h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Acompanhe a evolução do plano educacional</p>
                </div>
                <button
                    onClick={onOpenWizard}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-[1.05] active:scale-[0.95] transition-all"
                >
                    <Plus size={20} strokeWidth={3} />
                    Novo PEI Completo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockHistory.map((pei) => (
                    <div key={pei.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-[1.5rem] text-[9px] font-black uppercase tracking-widest ${pei.status === 'Ativo' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                            }`}>
                            {pei.status}
                        </div>

                        <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <FileCheck size={28} />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-1">{pei.version}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={12} /> Criado em {pei.date}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Responsável</p>
                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{pei.creator}</p>
                                </div>
                                <button className="p-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State visual placeholder for history */}
                <div className="border-[1.5px] border-dashed border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-40">
                    <History size={32} className="text-slate-300 mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sem outros registros</p>
                </div>
            </div>
        </div>
    );
};
