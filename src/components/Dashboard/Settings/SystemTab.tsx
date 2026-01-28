import { useState, useEffect } from 'react';
import { Moon, Sun, Bell } from 'lucide-react';
import styles from '../SettingsView.module.css';

export const SystemTab = () => {
    // Basic dark mode implementation: toggles 'dark' class on html element
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        // Check initial state
        if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300 max-w-2xl">
            <h2 className={styles.sectionTitle}>Informações do Sistema</h2>
            <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Versão</span>
                    <span className={styles.infoValue}>1.0.0</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Ambiente</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">Produção</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Última atualização</span>
                    <span className={styles.infoValue}>28/01/2026</span>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Preferências</h2>
            <div className={styles.infoCard}>
                <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded px-2 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'}`}>
                            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Modo Escuro</p>
                            <p className="text-sm text-slate-500">Alternar entre tema claro e escuro</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded px-2 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Som de notificações</p>
                            <p className="text-sm text-slate-500">Tocar som ao receber alertas</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};
