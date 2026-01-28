import { useState } from 'react';
import { FileText, Calendar, Download, Users, Sliders, BookOpen, Home, School } from 'lucide-react';
import styles from './ReportsView.module.css';

export const ReportsView = () => {
    const [selectedStudent, setSelectedStudent] = useState('all');
    const [startDate, setStartDate] = useState('2025-07-28');
    const [endDate, setEndDate] = useState('2026-01-28');

    const handleGenerate = (reportType: string) => {
        alert(`Gerando ${reportType} para ${selectedStudent === 'all' ? 'Todos os Alunos' : 'Aluno Selecionado'}...`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Relatórios</h1>
                    <p className={styles.subtitle}>Gere relatórios detalhados e acompanhe o progresso.</p>
                </div>
            </div>

            {/* Configuration Panel */}
            <div className={`animate-in fade-in slide-in-from-top-4 duration-500 ${styles.configPanel}`}>
                <h2 className={styles.configTitle}>
                    <Sliders size={20} />
                    Configurações do Relatório
                </h2>

                <div className={styles.configGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Aluno <span className="text-red-500">*</span></label>
                        <select
                            className={styles.select}
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="all">Relatório Geral (todos os alunos)</option>
                            <option value="student1">Arthur Silva</option>
                            <option value="student2">Beatriz Costa</option>
                            <option value="student3">Caio Mendes</option>
                        </select>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Selecione um paciente (ou use Relatório Geral)</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Período Início</label>
                        <input
                            type="date"
                            className={styles.input}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Período Fim</label>
                        <input
                            type="date"
                            className={styles.input}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.summaryBox}>
                    <h3 className={styles.summaryTitle}>
                        {selectedStudent === 'all' ? 'Relatório Geral' : 'Relatório Individual'}
                    </h3>
                    <p className={styles.summaryText}>
                        {selectedStudent === 'all'
                            ? 'Todos os Alunos'
                            : 'Aluno Selecionado'}
                        {' • '}
                        Estatísticas gerais de {selectedStudent === 'all' ? 'todos os alunos' : 'desempenho'} no período selecionado
                    </p>
                </div>
            </div>

            {/* Configured Report Types Grid */}
            <h2 className={`mb-6 text-xl font-bold text-slate-800 dark:text-white`}>Gerar Relatório</h2>

            <div className={styles.reportsGrid}>
                {/* 1. Relatório de Acompanhamento */}
                <div className={`animate-in fade-in slide-in-from-left-4 duration-300 delay-100 ${styles.reportCard}`}>
                    <div className={styles.cardIcon}>
                        <Calendar size={32} />
                    </div>
                    <h3 className={styles.cardTitle}>Relatório de Acompanhamento</h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Diário/Semanal (Interno)</p>
                    <p className={styles.cardDesc}>
                        Gráficos de habilidades, comportamento-ABC, assiduidade e desempenho por disciplina
                    </p>
                    <button onClick={() => handleGenerate('Relatório de Acompanhamento')} className={styles.generateButton}>
                        <Download size={18} />
                        Gerar Relatório
                    </button>
                </div>

                {/* 2. Relatório Semestral */}
                <div className={`animate-in fade-in slide-in-from-left-4 duration-300 delay-200 ${styles.reportCard}`}>
                    <div className={styles.cardIcon}>
                        <FileText size={32} />
                    </div>
                    <h3 className={styles.cardTitle}>Relatório Semestral de Evolução</h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Para Família e Convênio</p>
                    <p className={styles.cardDesc}>
                        Resumo completo do progresso com objetivos iniciais, evolução por área e metas futuras
                    </p>
                    <button onClick={() => handleGenerate('Relatório Semestral')} className={styles.generateButton}>
                        <Download size={18} />
                        Gerar Relatório
                    </button>
                </div>

                {/* 3. Atividades para Casa */}
                <div className={`animate-in fade-in slide-in-from-left-4 duration-300 delay-300 ${styles.reportCard}`}>
                    <div className={styles.cardIcon}>
                        <Home size={32} />
                    </div>
                    <h3 className={styles.cardTitle}>Atividades para Casa</h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Orientações e Feedback</p>
                    <p className={styles.cardDesc}>
                        Registro de atividades sugeridas, orientações específicas e feedback domiciliar
                    </p>
                    <button onClick={() => handleGenerate('Atividades para Casa')} className={styles.generateButton}>
                        <Download size={18} />
                        Gerar Relatório
                    </button>
                </div>

                {/* 4. Orientações para Escola */}
                <div className={`animate-in fade-in slide-in-from-left-4 duration-300 delay-400 ${styles.reportCard}`}>
                    <div className={styles.cardIcon}>
                        <School size={32} />
                    </div>
                    <h3 className={styles.cardTitle}>Orientações para Escola</h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Relatório de Inclusão</p>
                    <p className={styles.cardDesc}>
                        Pontos fortes, desafios, adaptações e estratégias para professores
                    </p>
                    <button onClick={() => handleGenerate('Orientações para Escola')} className={styles.generateButton}>
                        <Download size={18} />
                        Gerar Relatório
                    </button>
                </div>
            </div>
        </div>
    );
};
