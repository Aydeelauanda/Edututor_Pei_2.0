import { useState } from 'react';
import { School, GraduationCap, Users } from 'lucide-react';
import styles from './ManagementView.module.css';
import { SchoolsTab } from './Management/SchoolsTab';
import { TeachersTab } from './Management/TeachersTab';
import { ClassesTab } from './Management/ClassesTab';

type Tab = 'schools' | 'teachers' | 'classes';

export const ManagementView = () => {
    const [activeTab, setActiveTab] = useState<Tab>('schools');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Gerenciamento Administrativo</h1>
                    <p className={styles.subtitle}>Gerencie escolas, equipe pedagógica e turmas.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${activeTab === 'schools' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('schools')}
                >
                    <School size={18} />
                    Escolas
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'teachers' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('teachers')}
                >
                    <GraduationCap size={18} />
                    Professores
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'classes' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('classes')}
                >
                    <Users size={18} />
                    Turmas
                </button>
            </div>

            {/* Content Content - Tabs will be rendered here */}
            <div className={styles.contentArea}>
                {activeTab === 'schools' && <SchoolsTab />}
                {activeTab === 'teachers' && <TeachersTab />}
                {activeTab === 'classes' && <ClassesTab />}
            </div>
        </div>
    );
};
