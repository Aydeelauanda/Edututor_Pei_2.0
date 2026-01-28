import { useState } from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';
import styles from './DisciplineView.module.css';

export const DisciplineView = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className={styles.container}>
                <div className={`animate-in fade-in slide-in-from-right-4 duration-300 ${styles.formContainer}`}>
                    <h2 className={styles.sectionTitle}>Nova Disciplina</h2>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nome da Disciplina <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Ex: Matemática" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Descrição</label>
                        <textarea placeholder="Descrição opcional da disciplina" className={styles.textarea} />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="active" className={styles.checkbox} defaultChecked />
                            <label htmlFor="active" className={styles.checkboxLabel}>Disciplina ativa</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Professores que lecionam esta disciplina</label>
                        <div className={styles.teachersList}>
                            {[
                                'João da Silva',
                                'Maria Oliveira',
                                'Carlos Santos',
                                'Ana Pereira'
                            ].map((teacher, i) => (
                                <div key={i} className={styles.teacherItem}>
                                    <input type="checkbox" id={`teacher-${i}`} className={styles.checkbox} />
                                    <label htmlFor={`teacher-${i}`} className="text-sm text-slate-700 cursor-pointer">{teacher}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>Cancelar</button>
                        <button className={styles.saveButton}>Salvar</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Disciplinas</h1>
                    <p className={styles.subtitle}>Gerencie as disciplinas e atribuições.</p>
                </div>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.searchGroup}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar disciplinas..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button onClick={() => setIsCreating(true)} className={styles.newButton}>
                    <Plus size={18} />
                    Nova Disciplina
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder List */}
                <div className="p-5 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Ativa</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">Matemática</h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">Fundamentos de aritmética e geometria para o ensino fundamental.</p>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                T{i}
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                            +2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
