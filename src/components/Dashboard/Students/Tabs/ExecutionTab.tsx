
import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, BookOpen, Activity, AlertCircle, CheckCircle2, Clock, RotateCcw, XCircle, MoreVertical } from 'lucide-react';

interface Execution {
    id: string;
    data: string;
    atividade: string;
    disciplina: string;
    nivelSuporte: string;
    tipoBarreira: string;
    status: 'não realizado' | 'replanejar' | 'Em Andamento' | 'concluido';
    observacoes: string;
}

export const ExecutionTab = ({ studentId }: { studentId: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        disciplina: '',
        status: '',
        nivelSuporte: '',
        tipoBarreira: '',
        data: '',
        observacoes: ''
    });

    // Mock data based on user request
    const [executions] = useState<Execution[]>([
        {
            id: '1',
            data: '11/02/2026',
            atividade: 'Coordenação Motora',
            disciplina: 'Educação Especial',
            nivelSuporte: 'FISICO',
            tipoBarreira: 'motora',
            status: 'concluido',
            observacoes: 'Desenvolveu bem a atividade de pinça.'
        },
        {
            id: '2',
            data: '10/02/2026',
            atividade: 'Leitura',
            disciplina: 'Português',
            nivelSuporte: 'Verbal',
            tipoBarreira: 'COgnitivo',
            status: 'Em Andamento',
            observacoes: 'Dificuldade em identificar vogais.'
        }
    ]);

    const filteredExecutions = useMemo(() => {
        return executions.filter(exec => {
            const matchesSearch = exec.atividade.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDisciplina = !filters.disciplina || exec.disciplina === filters.disciplina;
            const matchesStatus = !filters.status || exec.status === filters.status;
            const matchesSuporte = !filters.nivelSuporte || exec.nivelSuporte === filters.nivelSuporte;
            const matchesBarreira = !filters.tipoBarreira || exec.tipoBarreira === filters.tipoBarreira;
            const matchesData = !filters.data || exec.data.includes(filters.data);
            const matchesObs = !filters.observacoes || exec.observacoes.toLowerCase().includes(filters.observacoes.toLowerCase());

            return matchesSearch && matchesDisciplina && matchesStatus && matchesSuporte && matchesBarreira && matchesData && matchesObs;
        });
    }, [executions, searchTerm, filters]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'concluido': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Em Andamento': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'replanejar': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'não realizado': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'concluido': return <CheckCircle2 size={14} />;
            case 'Em Andamento': return <Clock size={14} />;
            case 'replanejar': return <RotateCcw size={14} />;
            case 'não realizado': return <XCircle size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header / Stats */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight italic">Acompanhamento de <span className="text-primary">Execução</span></h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Histórico detalhado de atividades e evolução</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar Atividade..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl pl-11 pr-5 py-3 text-sm font-bold outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Filters Grid */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Filter size={16} className="text-primary" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtros Avançados</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <FilterInput label="Data" value={filters.data} onChange={(v) => setFilters({ ...filters, data: v })} placeholder="DD/MM" />
                    <FilterSelect
                        label="Disciplina"
                        value={filters.disciplina}
                        onChange={(v) => setFilters({ ...filters, disciplina: v })}
                        options={Array.from(new Set(executions.map(e => e.disciplina)))}
                    />
                    <FilterSelect
                        label="Status"
                        value={filters.status}
                        onChange={(v) => setFilters({ ...filters, status: v })}
                        options={['não realizado', 'replanejar', 'Em Andamento', 'concluido']}
                    />
                    <FilterSelect
                        label="Suporte"
                        value={filters.nivelSuporte}
                        onChange={(v) => setFilters({ ...filters, nivelSuporte: v })}
                        options={['FISICO', 'Verba l', 'SEM SUPORTE']}
                    />
                    <FilterSelect
                        label="Barreira"
                        value={filters.tipoBarreira}
                        onChange={(v) => setFilters({ ...filters, tipoBarreira: v })}
                        options={['COgnitivo', 'motora', 'sensorial', 'comportamental']}
                    />
                    <FilterInput label="Observações" value={filters.observacoes} onChange={(v) => setFilters({ ...filters, observacoes: v })} placeholder="Buscar obs..." />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-700/50 text-left">
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Atividade / Objetivo</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Suporte</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Barreira</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Observações</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                            {filteredExecutions.map((exec) => (
                                <tr key={exec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-primary" />
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{exec.data}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-xs font-black text-slate-900 dark:text-white">{exec.atividade}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={14} className="text-slate-400" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{exec.disciplina}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-[10px] font-black text-slate-500 uppercase">{exec.nivelSuporte}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Activity size={14} className="text-slate-400" />
                                            <span className="text-[10px] font-bold text-slate-500 lowercase">{exec.tipoBarreira}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${getStatusStyle(exec.status)}`}>
                                            {getStatusIcon(exec.status)}
                                            {exec.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-medium text-slate-500 line-clamp-1 max-w-[200px]">{exec.observacoes}</p>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-primary">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredExecutions.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <AlertCircle size={40} className="text-slate-200" />
                                            <p className="text-sm font-bold text-slate-400">Nenhum registro encontrado</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const FilterSelect = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border-[1.5px] border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer"
        >
            <option value="">Todos</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const FilterInput = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white dark:bg-slate-800 border-[1.5px] border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-primary/30 transition-all"
        />
    </div>
);
