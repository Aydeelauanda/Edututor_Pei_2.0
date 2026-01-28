import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import styles from '../ManagementView.module.css';

export const TeachersTab = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className={`animate-in fade-in slide-in-from-right-4 duration-300 ${styles.formContainer}`}>
                <h2 className={styles.sectionTitle}>Cadastro de Profissional</h2>
                <p className="text-slate-500 mb-6 text-sm">Preencha os dados completos do terapeuta/professor</p>

                <div className={styles.grid}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Nome Completo <span className="text-red-500">*</span></label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email <span className="text-red-500">*</span></label>
                        <input type="email" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Telefone</label>
                        <input type="tel" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Disciplina <span className="text-red-500">*</span></label>
                        <select className={styles.select}>
                            <option>Selecione uma disciplina</option>
                            <option>Pedagogia</option>
                            <option>Matemática</option>
                            <option>Português</option>
                            <option>Psicopedagogia</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Registro Profissional</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>CPF</label>
                        <input type="text" placeholder="000.000.000-00" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>RG</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Data de Nascimento</label>
                        <input type="date" className={styles.input} />
                    </div>
                </div>

                <h3 className={`${styles.sectionTitle} mt-8 mb-4`}>Endereço</h3>
                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>CEP</label>
                        <input type="text" placeholder="00000-000" className={styles.input} />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.label}>Logradouro</label>
                        <input type="text" className={styles.input} />
                    </div>
                    {/* Simplified for brevity based on request, can add more fields if needed but user stopped at 'UF' in example */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Número</label>
                        <input type="text" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Complemento</label>
                        <input type="text" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bairro</label>
                        <input type="text" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cidade</label>
                        <input type="text" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>UF</label>
                        <input type="text" className={styles.input} />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.saveButton}>Salvar Profissional</button>
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
                        placeholder="Buscar profissionais..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button onClick={() => setIsCreating(true)} className={styles.newButton}>
                    <Plus size={18} />
                    Cadastro de Profissional
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder List */}
                <div className="p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">JD</div>
                    <div>
                        <h3 className="font-bold text-slate-800">João da Silva</h3>
                        <p className="text-sm text-slate-500">Psicopedagogia</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
