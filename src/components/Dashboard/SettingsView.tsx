import { useState } from 'react';
import { Users, Settings as SystemIcon, Shield } from 'lucide-react';
import styles from './SettingsView.module.css';
import { UsersTab } from './Settings/UsersTab';
import { SystemTab } from './Settings/SystemTab';
import { SecurityTab } from './Settings/SecurityTab';

type Tab = 'users' | 'system' | 'security';

export const SettingsView = () => {
    const [activeTab, setActiveTab] = useState<Tab>('users');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Configurações</h1>
                    <p className={styles.subtitle}>Gerencie usuários, preferências do sistema e segurança.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <Users size={18} />
                    Usuários
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'system' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('system')}
                >
                    <SystemIcon size={18} />
                    Sistema
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'security' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    <Shield size={18} />
                    Segurança
                </button>
            </div>

            {/* Content Area */}
            <div className={styles.contentArea}>
                {activeTab === 'users' && <UsersTab />}
                {activeTab === 'system' && <SystemTab />}
                {activeTab === 'security' && <SecurityTab />}
            </div>
        </div>
    );
};
