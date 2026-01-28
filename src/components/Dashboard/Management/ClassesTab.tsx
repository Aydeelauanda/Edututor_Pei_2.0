import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import styles from '../ManagementView.module.css';

export const ClassesTab = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className={`animate-in fade-in slide-in-from-right-4 duration-300 ${styles.formContainer}`}>
                <h2 className={styles.sectionTitle}>Nova Turma</h2>

                <div className={styles.grid}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Nome da Turma <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Ex: Turma A, 1º Ano A, etc." className={styles.input} />
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Escola <span className="text-red-500">*</span></label>
                        <select className={styles.select}>
                            <option>Escola Principal</option>
                            <option>Escola Municipal Exemplo</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Série/Ano</label>
                        <input type="text" placeholder="Ex: 1º Ano, 2º Ano, etc." className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Período <span className="text-red-500">*</span></label>
                        <select className={styles.select}>
                            <option>Manhã</option>
                            <option>Tarde</option>
                            <option>Noite</option>
                            <option>Integral</option>
                        </select>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.saveButton}>Criar Turma</button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className={styles.toolbar}>
                <div className={styles.searchGroup}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar turmas..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button onClick={() => setIsCreating(true)} className={styles.newButton}>
                    <Plus size={18} />
                    Nova Turma
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Placeholder List */}
                <div className="p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800">1º Ano A</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Manhã</span>
                    </div>
                    <p className="text-sm text-slate-500">Escola Municipal Exemplo</p>
                </div>
            </div>
        </div>
    );
};
