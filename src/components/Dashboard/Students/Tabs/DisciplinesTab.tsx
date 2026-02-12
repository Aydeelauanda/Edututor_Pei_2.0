import { useState } from 'react';
import { Plus, BookOpen, User, Check, Trash2, X, Search, Info } from 'lucide-react';

interface Teacher {
    id: string;
    nome: string;
    especialidade: string;
}

interface Discipline {
    id: string;
    nome: string;
    descricao?: string;
    ativa: boolean;
    professores: string[]; // IDs
}

const TEACHERS: Teacher[] = [
    { id: '1', nome: 'Aline Cely Araujo da Silva', especialidade: 'Informatica' },
    { id: '2', nome: 'Aydêe Lauanda Costa Barroso', especialidade: 'História' },
    { id: '3', nome: 'Aydêe Lauanda Viena da Cruz', especialidade: 'Geografia' },
    { id: '4', nome: 'Bianca Moraes Silva', especialidade: 'Topografia' },
    { id: '5', nome: 'Gestor Principal', especialidade: 'Gestão' },
    { id: '6', nome: 'Lana Cortes Silva', especialidade: 'Matematica' },
    { id: '7', nome: 'Manoel Gualberto Rangel', especialidade: '9' },
    { id: '8', nome: 'Maria Edna Trindade Costa', especialidade: 'Geografia' },
];

export const DisciplinesTab = ({ studentId }: { studentId: string }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [disciplines, setDisciplines] = useState<Discipline[]>([
        { id: '1', nome: 'Educação Especial', descricao: 'Apoio especializado regular', ativa: true, professores: ['1', '5'] },
        { id: '2', nome: 'Inclusão Digital', ativa: true, professores: ['1'] },
    ]);

    const [form, setForm] = useState<Partial<Discipline>>({
        nome: '',
        descricao: '',
        ativa: true,
        professores: []
    });

    const toggleTeacher = (id: string) => {
        const current = form.professores || [];
        if (current.includes(id)) {
            setForm({ ...form, professores: current.filter(t => t !== id) });
        } else {
            setForm({ ...form, professores: [...current, id] });
        }
    };

    const handleSave = () => {
        if (!form.nome) return;
        const disc: Discipline = {
            id: Math.random().toString(),
            nome: form.nome,
            descricao: form.descricao,
            ativa: form.ativa || true,
            professores: form.professores || []
        };
        setDisciplines([...disciplines, disc]);
        setIsAdding(false);
        setForm({ nome: '', descricao: '', ativa: true, professores: [] });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight italic">Grade de <span className="text-primary">Disciplinas</span></h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gerencie as matérias e professores deste aluno</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-[1.05] transition-all"
                >
                    <Plus size={18} strokeWidth={3} /> Nova Disciplina
                </button>
            </div>

            {/* Modal-like Overlay for Adding */}
            {isAdding && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">Nova <span className="text-primary">Disciplina</span></h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complete os dados da matéria</p>
                                </div>
                                <button onClick={() => setIsAdding(false)} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-500 transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome da Disciplina *</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Matemática"
                                        value={form.nome}
                                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl px-5 py-4 text-sm font-bold outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                                    <textarea
                                        placeholder="Descrição opcional..."
                                        value={form.descricao}
                                        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl px-5 py-4 text-sm font-bold outline-none h-24"
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={form.ativa}
                                        onChange={(e) => setForm({ ...form, ativa: e.target.checked })}
                                        className="size-5 rounded-lg accent-primary"
                                    />
                                    <label htmlFor="active" className="text-sm font-black text-slate-700 dark:text-slate-200">Disciplina ativa</label>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                                        Professores que lecionam esta disciplina
                                        <span className="text-primary font-black lowercase tracking-normal">{form.professores?.length || 0} selecionado(s)</span>
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {TEACHERS.map((teacher) => (
                                            <button
                                                key={teacher.id}
                                                onClick={() => toggleTeacher(teacher.id)}
                                                className={`flex items-center justify-between p-4 rounded-2xl border-[1.5px] transition-all text-left ${form.professores?.includes(teacher.id)
                                                        ? 'bg-primary/5 border-primary/30'
                                                        : 'bg-slate-50 dark:bg-slate-900/30 border-transparent hover:border-slate-200'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-8 rounded-lg flex items-center justify-center font-black text-[10px] ${form.professores?.includes(teacher.id) ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                                                        }`}>
                                                        {teacher.nome.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{teacher.nome}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">({teacher.especialidade})</p>
                                                    </div>
                                                </div>
                                                {form.professores?.includes(teacher.id) && <Check size={16} className="text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setIsAdding(false)} className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Descartar</button>
                                <button onClick={handleSave} className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/25 transition-all hover:scale-[1.02]">Salvar Disciplina</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* List of Disciplines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {disciplines.map((disc) => (
                    <div key={disc.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 hover:border-primary/20 transition-all relative">
                        {!disc.ativa && <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-[1px] rounded-[2.5rem] z-10 flex items-center justify-center font-black text-slate-400 uppercase tracking-[0.3em] rotate-12 pointer-events-none">Inativa</div>}

                        <div className="flex justify-between items-start mb-6">
                            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BookOpen size={28} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{disc.nome}</h4>
                                {disc.descricao && <p className="text-sm font-medium text-slate-500 line-clamp-2 mt-1">{disc.descricao}</p>}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <User size={12} className="text-primary" /> Professores
                                    </span>
                                    <span className="text-[10px] font-black text-primary lowercase">{disc.professores.length} profissional(is)</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {disc.professores.map(pid => {
                                        const t = TEACHERS.find(x => x.id === pid);
                                        return (
                                            <div key={pid} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                                                {t?.nome}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};