import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Users, Edit3, Trash2, Loader2 } from 'lucide-react';
import { StudentRegistrationWizard } from './StudentRegistrationWizard';
import { StudentDetailView } from './StudentDetailView';
import { studentService } from '../../../lib/studentService';

// Tipagem atualizada para refletir o banco de dados
interface Student {
    id: string;
    nome: string;
    escola: string;
    status: string;
    responsavel_nome: string;
    serie: string;
    cid?: string;
    data_nascimento: string;
    genero: string;
    created_at: string;
}

export const StudentsView = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStudents = async () => {
        try {
            setIsLoading(true);
            const data = await studentService.getAll();
            setStudents(data as any);
        } catch (err: any) {
            setError('Erro ao carregar alunos: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleRegistrationComplete = async () => {
        setIsRegistering(false);
        await loadStudents(); // Recarrega a lista após novo cadastro
    };

    if (isRegistering) {
        return (
            <StudentRegistrationWizard
                onCancel={() => setIsRegistering(false)}
                onComplete={handleRegistrationComplete}
            />
        );
    }

    if (selectedStudent) {
        return <StudentDetailView student={selectedStudent as any} onBack={() => setSelectedStudent(null)} />;
    }

    return (
        <div className="animate-in fade-in duration-700 space-y-8 pb-12">
            {/* Header View */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary tracking-tight">
                        Gestão de <span className="italic">Alunos</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <div className="size-1.5 bg-primary rounded-full animate-pulse" />
                        {students.length} alunos registrados em sua rede
                    </p>
                </div>

                <button
                    onClick={() => setIsRegistering(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/25 transition-all hover:scale-[1.05] active:scale-[0.95]"
                >
                    <Plus size={20} strokeWidth={3} />
                    Novo Aluno / PEI
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-4xl border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-12 xl:col-span-6 relative group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Busca Direta</label>
                        <Search className="absolute left-4 top-[50px] text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Nome Completo, Responsável ou CID..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/50 focus:bg-white rounded-xl py-4 pl-12 pr-4 text-sm font-bold dark:text-white transition-all outline-none"
                        />
                    </div>

                    <div className="lg:col-span-6 xl:col-span-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Status do Registro</label>
                        <div className="flex gap-2">
                            {['Todos', 'Ativo', 'Inativo'].map((st) => (
                                <button key={st} className="flex-1 py-4 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-[10px] font-black uppercase tracking-widest border-[1.5px] border-transparent hover:border-primary/20 hover:text-primary transition-all">
                                    {st}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 xl:col-span-2">
                        <button className="w-full py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all border-[1.5px] border-transparent">
                            <Filter size={18} />
                            Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Students List Table */}
            <div className="bg-white dark:bg-slate-800 rounded-4xl border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <Loader2 size={40} className="text-primary animate-spin mb-4" />
                        <h3 className="font-black text-slate-400 uppercase tracking-widest">Carregando alunos...</h3>
                    </div>
                ) : error ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <p className="text-red-500 font-bold">{error}</p>
                        <button onClick={loadStudents} className="mt-4 text-primary underline font-black uppercase text-[10px]">Tentar novamente</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-left">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aluno / Identificação</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Instituição / Escola</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsável</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {students.map((student) => (
                                    <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all cursor-pointer" onClick={() => setSelectedStudent(student)}>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-14 rounded-2xl bg-slate-900 dark:bg-white/10 flex items-center justify-center text-white font-black text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform overflow-hidden">
                                                    {student.nome.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors text-base">{student.nome}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1 mt-0.5">
                                                        <Users size={12} /> {student.serie}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{student.escola}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-300">{student.responsavel_nome}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${student.status === 'Ativo' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                <div className={`size-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 bg-slate-50 dark:bg-slate-700/50 text-slate-500 hover:text-primary rounded-xl transition-all"><Edit3 size={18} /></button>
                                                <button className="p-3 bg-slate-50 dark:bg-slate-700/50 text-slate-500 hover:text-red-500 rounded-xl transition-all"><Trash2 size={18} /></button>
                                                <button
                                                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-lg active:scale-95"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedStudent(student);
                                                    }}
                                                >
                                                    Ver Aluno
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && students.length === 0 && (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <Users size={40} className="text-slate-200 mb-4" />
                        <h3 className="font-black text-slate-400 uppercase tracking-widest">Nenhum aluno registrado</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
