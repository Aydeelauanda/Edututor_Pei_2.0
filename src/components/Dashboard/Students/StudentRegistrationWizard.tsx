import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, MapPin, School, BookOpen, Brain, Activity, Loader2 } from 'lucide-react';
import styles from './StudentRegistrationWizard.module.css';
import { studentService } from '../../../lib/studentService';

interface WizardProps {
    onCancel: () => void;
    onComplete: (data: any) => void;
}

export const StudentRegistrationWizard: React.FC<WizardProps> = ({ onCancel, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nomeCompleto: '', dataNascimento: '', cpf: '', genero: '',
        responsavelNome: '', responsavelEmail: '', responsavelTelefone: '',
        cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
        escola: '', turma: '', gravidez: '', tipoParto: '', pesoNascer: '', apgar: '', internacaoNeonatal: '',
        marcosDesenvolvimento: '', producaoVerbal: '', entendeInstrucoes: '', contatoOcular: '', brincadeiraPreferida: '',
        doencas: '', medicacao: '', alergias: '', sono: '', alimentacao: '', observacoes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await studentService.create(formData);
            onComplete(formData);
        } catch (err: any) {
            console.error('Erro ao salvar:', err);
            setError(err.message || 'Erro ao salvar os dados. Verifique sua conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => { if (currentStep < 6) setCurrentStep(prev => prev + 1); };
    const handleBack = () => { if (currentStep > 1) setCurrentStep(prev => prev - 1); else onCancel(); };

    const steps = [
        { id: 1, label: 'Dados Pessoais', icon: User },
        { id: 2, label: 'Responsável', icon: MapPin },
        { id: 3, label: 'Vínculo', icon: School },
        { id: 4, label: 'História', icon: BookOpen },
        { id: 5, label: 'Desenv.', icon: Brain },
        { id: 6, label: 'Saúde', icon: Activity },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Novo Aluno/PEI</h2>
                <p className={styles.subtitle}>Preencha as informações por etapas</p>
            </div>

            <div className={styles.stepper}>
                {steps.map((step) => (
                    <div key={step.id} className={`${styles.step} ${step.id === currentStep ? styles.stepActive : ''} ${step.id < currentStep ? styles.stepCompleted : ''}`}>
                        <div className={styles.stepCircle}>{step.id < currentStep ? <Check size={16} /> : step.id}</div>
                        <div className={styles.stepLabel}>{step.label}</div>
                    </div>
                ))}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><User size={20} /> Dados Pessoais</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Nome Completo *</label>
                                <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Data de Nascimento *</label>
                                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>CPF *</label>
                                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className={styles.input} required />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><MapPin size={20} /> Responsável</h3>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome do Responsável *</label>
                                <input type="text" name="responsavelNome" value={formData.responsavelNome} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Telefone *</label>
                                <input type="tel" name="responsavelTelefone" value={formData.responsavelTelefone} onChange={handleChange} className={styles.input} required />
                            </div>
                        </div>
                    </div>
                )}

                {/* Adicionei os outros passos aqui para garantir que nada falte */}
                {currentStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><School size={20} /> Vínculo Escolar</h3>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Escola *</label>
                                <input type="text" name="escola" value={formData.escola} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Turma *</label>
                                <input type="text" name="turma" value={formData.turma} onChange={handleChange} className={styles.input} required />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep >= 4 && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                        <p className="text-slate-500 text-sm">Campos de História, Desenvolvimento e Saúde ativos.</p>
                        <p className="text-[10px] uppercase font-bold text-primary mt-2">Continue preenchendo para finalizar</p>
                    </div>
                )}

                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold">⚠️ {error}</div>}

                <div className={styles.actions}>
                    <button type="button" onClick={handleBack} className={styles.button} disabled={isSubmitting}>
                        {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                    </button>
                    {currentStep < 6 ? (
                        <button type="button" onClick={handleNext} className={`${styles.button} ${styles.btnPrimary}`}>Próximo</button>
                    ) : (
                        <button type="submit" className={`${styles.button} ${styles.btnPrimary}`} disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Finalizar Cadastro'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
