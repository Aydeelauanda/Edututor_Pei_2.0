import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import styles from '../SettingsView.module.css';

export const UsersTab = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className={`animate-in fade-in slide-in-from-right-4 duration-300 ${styles.formContainer}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={styles.sectionTitle}>Novo Usuário</h2>
                    <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">×</button>
                </div>

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
                        <label className={styles.label}>Senha <span className="text-red-500">*</span></label>
                        <input type="password" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tipo <span className="text-red-500">*</span></label>
                        <select className={styles.select}>
                            <option>Profissional</option>
                            <option>Administrador</option>
                            <option>Tutor</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Especialidade</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nível de Permissão <span className="text-red-500">*</span></label>
                        <select className={styles.select}>
                            <option>Administrativo</option>
                            <option>Operacional</option>
                            <option>Visualização</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Telefone</label>
                        <input type="tel" className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Escola</label>
                        <select className={styles.select}>
                            <option>Selecione uma escola</option>
                            <option>Escola Municipal Exemplo</option>
                        </select>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => setIsCreating(false)} className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.saveButton}>Salvar Usuário</button>
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
                        placeholder="Buscar usuários..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button onClick={() => setIsCreating(true)} className={styles.newButton}>
                    <Plus size={18} />
                    Novo Usuário
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Nome</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-800">Admin Principal</td>
                            <td className="px-6 py-4 text-slate-500">admin@edututor.com</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Admin</span></td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Ativo</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
