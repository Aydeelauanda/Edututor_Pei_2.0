import { Shield, Smartphone, LogOut } from 'lucide-react';
import styles from '../SettingsView.module.css';

export const SecurityTab = () => {
    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300 max-w-2xl">
            <h2 className={styles.sectionTitle}>Alterar Senha</h2>
            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Senha atual</label>
                    <input type="password" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nova senha</label>
                    <input type="password" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Confirmar nova senha</label>
                    <input type="password" className={styles.input} />
                </div>
                <div className="flex justify-end mt-4">
                    <button className={styles.saveButton}>Alterar Senha</button>
                </div>
            </div>

            <h2 className={`${styles.sectionTitle} mt-8`}>Sessões Ativas</h2>
            <div className={styles.infoCard}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Você está conectado em 1 dispositivo</p>
                            <p className="text-sm text-slate-500">Gerencie onde sua conta está conectada.</p>
                        </div>
                    </div>
                    <button className="text-red-600 text-sm font-bold hover:underline">Sair de todas</button>
                </div>

                <div className="border border-slate-100 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Smartphone size={24} className="text-slate-400" />
                        <div>
                            <p className="font-bold text-slate-800">Linux Desktop (Este dispositivo)</p>
                            <p className="text-xs text-slate-500">Chrome • São Paulo, BR • Ativo agora</p>
                        </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Atual</span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
                    <button className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                        <LogOut size={18} />
                        Encerrar todas as sessões
                    </button>
                </div>
            </div>
        </div>
    );
};
