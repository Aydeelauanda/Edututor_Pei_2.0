import { useState } from 'react';
import { Search, Plus, BookOpen, X, Check, Trash2, Edit2, Users } from 'lucide-react';

interface Teacher {
    id: string;
    nome: string;
    especialidade: string;
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

export const DisciplineView = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

    const toggleTeacher = (id: string) => {
        if (selectedTeachers.includes(id)) {
            setSelectedTeachers(selectedTeachers.filter(t => t !== id));
        } else {
            setSelectedTeachers([...selectedTeachers, id]);
        }
    };

    if (isCreating) {
        return (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">Nova <span className="text-primary">Disciplina</span></h2>
                        <p className="text-sm font-medium text-slate-500">Cadastre uma nova matéria base para a rede de ensino</p>
                    </div>
                    <button onClick={() => setIsCreating(false)} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                        <X size={20} />
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 border-[1.5px] border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-10 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome da Disciplina *</label>
                            <input
                                type="text"
                                placeholder="Ex: Matemática"
                                className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl py-5 px-6 text-sm font-bold outline-none transition-all dark:text-white border-none shadow-inner"
                            />
                        </div>

                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="relative">
                                    <input type="checkbox" className="peer hidden" defaultChecked />
                                    <div className="size-7 rounded-xl bg-slate-100 dark:bg-slate-900 border-[1.5px] border-slate-200 dark:border-slate-700 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                                        <Check size={16} className="text-white scale-0 peer-checked:scale-100 transition-transform" strokeWidth={4} />
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors">Disciplina Ativa</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                        <textarea
                            placeholder="Descrição opcional da disciplina..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[2px] border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-primary/20 rounded-[2rem] py-5 px-6 text-sm font-bold outline-none transition-all dark:text-white min-h-[120px] shadow-inner"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professores que lecionam esta disciplina</label>
                            <span className="text-primary font-bold text-[10px] lowercase">{selectedTeachers.length} professor(es) selecionado(s)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {TEACHERS.map((teacher) => (
                                <button
                                    key={teacher.id}
                                    onClick={() => toggleTeacher(teacher.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-[1.5px] transition-all text-left ${selectedTeachers.includes(teacher.id)
                                        ? 'bg-primary/5 border-primary/30'
                                        : 'bg-slate-50 dark:bg-slate-900/30 border-transparent hover:border-slate-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-xl flex items-center justify-center font-black text-xs ${selectedTeachers.includes(teacher.id) ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 text-slate-400'
                                            }`}>
                                            {teacher.nome.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">{teacher.nome}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">({teacher.especialidade})</p>
                                        </div>
                                    </div>
                                    {selectedTeachers.includes(teacher.id) && (
                                        <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white">
                                            <Check size={14} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-5">
                        <button
                            onClick={() => setIsCreating(false)}
                            className="px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-all font-bold"
                        >
                            Descartar
                        </button>
                        <button className="px-12 py-5 bg-primary hover:bg-primary/90 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                            Salvar Disciplina
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700 space-y-10 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Matriz <span className="text-primary italic">Curricular</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                            8 Matérias Registradas
                        </p>
                        <span className="text-slate-200 dark:text-slate-700">|</span>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Organização por competências</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:scale-[1.05] active:scale-[0.95] transition-all"
                >
                    <Plus size={22} strokeWidth={3} />
                    Nova Disciplina
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm flex flex-col xl:flex-row gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou docente..."
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-[2px] border-transparent focus:border-primary/20 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm font-bold dark:text-white outline-none transition-all shadow-inner"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {[
                    { name: 'Matemática', desc: 'Fundamentos de aritmética, geometria e lógica aplicada ao cotidiano do aluno.', color: 'text-blue-500', bg: 'bg-blue-50', icon: BookOpen, count: 4 },
                    { name: 'Língua Portuguesa', desc: 'Desenvolvimento de competências de leitura, escrita e interpretação adaptada.', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: BookOpen, count: 3 },
                    { name: 'Artes', desc: 'Exploração de expressões artísticas, criatividade e novas texturas sensoriais.', color: 'text-purple-500', bg: 'bg-purple-50', icon: BookOpen, count: 2 }
                ].map((disc, i) => (
                    <div key={i} className="group bg-white dark:bg-slate-800 p-10 rounded-[3.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500 relative flex flex-col items-center text-center">
                        <div className={`size-20 rounded-[2rem] ${disc.bg} dark:bg-slate-900 ${disc.color} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all mb-8`}>
                            <disc.icon size={36} />
                        </div>

                        <div className="absolute top-8 right-8">
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-emerald-100">Ativa</span>
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter group-hover:text-primary transition-colors italic">{disc.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-10 max-w-[240px]">
                            {disc.desc}
                        </p>

                        <div className="w-full pt-8 border-t border-slate-50 dark:border-slate-700 flex flex-col items-center gap-5">
                            <div className="flex items-center -space-x-4">
                                {[1, 2, 3].map(t => (
                                    <div key={t} className="size-10 rounded-2xl bg-white dark:bg-slate-900 border-[3px] border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-xl overflow-hidden">
                                        <div className="size-full bg-slate-200 animate-pulse" />
                                    </div>
                                ))}
                                <div className="size-10 rounded-2xl bg-primary text-white border-[3px] border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-black shadow-xl shadow-primary/20 z-10">
                                    +{disc.count}
                                </div>
                            </div>
                            <button className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-[0.3em] transition-colors flex items-center gap-2">
                                <Users size={14} /> Gerenciar Docentes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};