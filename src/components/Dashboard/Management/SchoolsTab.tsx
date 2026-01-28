import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import styles from '../ManagementView.module.css';

export const SchoolsTab = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className={`animate-in fade-in slide-in-from-right-4 duration-300 ${styles.formContainer}`}>
                <h2 className={styles.sectionTitle}>Nova Escola</h2>
                <div className={styles.grid}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Nome da Escola <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Digite o nome da escola" className={styles.input} />
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Logradouro</label>
                        <input type="text" placeholder="Rua, Av, etc." className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Número</label>
                        <input type="text" placeholder="Nº" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bairro</label>
                        <input type="text" placeholder="Bairro" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cidade</label>
                        <input type="text" placeholder="Cidade" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Estado</label>
                        <input type="text" placeholder="UF" className={styles.input} />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.saveButton}>Criar Escola</button>
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
                        placeholder="Buscar escolas..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button onClick={() => setIsCreating(true)} className={styles.newButton}>
                    <Plus size={18} />
                    Nova Escola
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Placeholder List */}
                <div className="p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all">
                    <h3 className="font-bold text-slate-800">Escola Municipal Exemplo</h3>
                    <p className="text-sm text-slate-500 mt-1">Av. Principal, 100 - Centro</p>
                </div>
            </div>
        </div>
    );
};
