import { useState } from 'react';
import { Search, Plus, Filter, LayoutGrid, List } from 'lucide-react';
import styles from './StudentsView.module.css';
import { StudentRegistrationWizard } from './StudentRegistrationWizard';

export const StudentsView = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegistrationComplete = (data: any) => {
        console.log('Dados do novo aluno:', data);
        // Aqui você salvaria os dados no Supabase ou estado global
        setIsRegistering(false);
    };

    if (isRegistering) {
        return (
            <StudentRegistrationWizard
                onCancel={() => setIsRegistering(false)}
                onComplete={handleRegistrationComplete}
            />
        );
    }

    return (
        <div className={styles.container}>
            {/* Header View */}
            <div className={styles.header}>
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <h1 className={styles.title}>Gestão de Alunos</h1>
                    <p className={styles.subtitle}>Gerencie turmas, alunos e planos educacionais.</p>
                </div>

                <button onClick={() => setIsRegistering(true)} className={styles.newButton}>
                    <Plus size={20} />
                    Novo Aluno/PEI
                </button>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.searchGroup}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, matrícula ou CID..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select className={styles.select} defaultValue="">
                        <option value="" disabled>Filtrar por Turma</option>
                        <option value="1a">1º Ano A</option>
                        <option value="1b">1º Ano B</option>
                        <option value="2a">2º Ano A</option>
                    </select>

                    <select className={styles.select} defaultValue="">
                        <option value="" disabled>Período</option>
                        <option value="morning">Matutino</option>
                        <option value="afternoon">Vespertino</option>
                        <option value="evening">Noturno</option>
                        <option value="all">Todos</option>
                    </select>

                    <select className={styles.select} defaultValue="">
                        <option value="" disabled>Status do PEI</option>
                        <option value="active">Em Andamento</option>
                        <option value="pending">Pendente</option>
                        <option value="completed">Concluído</option>
                        <option value="all">Todos</option>
                    </select>

                    <div className="h-full w-px bg-slate-200 mx-2 hidden lg:block"></div>

                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button className="p-2 rounded-md bg-white shadow-sm text-slate-700"><LayoutGrid size={18} /></button>
                        <button className="p-2 rounded-md text-slate-400 hover:text-slate-600"><List size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Content Area - Placeholder for now */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Placeholder cards to show layout */}
                <div className="h-64 rounded-3xl bg-white border border-slate-100 border-dashed border-2 flex flex-col items-center justify-center text-slate-400 gap-4">
                    <div className="p-4 bg-slate-50 rounded-full">
                        <Search size={32} className="opacity-50" />
                    </div>
                    <span className="font-semibold text-sm">Selecione filtros ou adicione um aluno</span>
                </div>
            </div>
        </div>
    );
};
