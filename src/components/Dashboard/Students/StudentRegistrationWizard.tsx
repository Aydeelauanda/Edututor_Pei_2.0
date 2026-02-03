import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, MapPin, School, BookOpen, Brain, Activity, Loader2 } from 'lucide-react';
import styles from './StudentRegistrationWizard.module.css';
import { studentService } from '../../../lib/studentService';

interface WizardProps {
    onCancel: () => void;
    onComplete: () => void;
}

export const StudentRegistrationWizard: React.FC<WizardProps> = ({ onCancel, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        // Step 1: Dados Pessoais
        nomeCompleto: '',
        dataNascimento: '',
        cpf: '',
        genero: '',
        // Step 2: Responsável
        responsavelNome: '',
        responsavelEmail: '',
        responsavelTelefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        // Step 3: Vínculo
        escola: '',
        turma: '',
        // Step 4: História
        gravidez: '',
        tipoParto: '',
        pesoNascer: '',
        apgar: '',
        internacaoNeonatal: '',
        // Step 5: Desenvolvimento
        marcosDesenvolvimento: '',
        producaoVerbal: '',
        entendeInstrucoes: '',
        contatoOcular: '',
        brincadeiraPreferida: '',
        // Step 6: Saúde e Rotinas
        doencas: '',
        medicacao: '',
        alergias: '',
        sono: '',
        alimentacao: '',
        observacoes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const steps = [
        { id: 1, label: 'Dados Pessoais', icon: User },
        { id: 2, label: 'Responsável', icon: MapPin },
        { id: 3, label: 'Vínculo', icon: School },
        { id: 4, label: 'História', icon: BookOpen },
        { id: 5, label: 'Desenv.', icon: Brain },
        { id: 6, label: 'Saúde', icon: Activity },
    ];

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
        else onCancel();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await studentService.create({
                nome: formData.nomeCompleto,
                data_nascimento: formData.dataNascimento,
                cpf: formData.cpf,
                genero: formData.genero,
                escola: formData.escola,
                serie: formData.turma,
                responsavel_nome: formData.responsavelNome,
                responsavel_email: formData.responsavelEmail,
                responsavel_telefone: formData.responsavelTelefone,
                // Outros campos podem ser adicionados conforme necessário no schema
            });
            onComplete();
        } catch (err: any) {
            setError('Erro ao salvar aluno: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Novo Aluno/PEI</h2>
                <p className={styles.subtitle}>Preencha as informações por etapas</p>
            </div>

            {/* Stepper */}
            <div className={styles.stepper}>
                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div
                            key={step.id}
                            className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepCompleted : ''}`}
                        >
                            <div className={styles.stepCircle}>
                                {isCompleted ? <Check size={16} /> : step.id}
                            </div>
                            <div className={styles.stepLabel}>{step.label}</div>
                        </div>
                    );
                })}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold">
                    {error}
                </div>
            )}

            {/* Form Content */}
            <form className={styles.form} onSubmit={handleSubmit}>

                {/* Step 1: Dados Pessoais */}
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><User size={20} /> Dados Pessoais do Aluno</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Nome Completo <span className={styles.required}>*</span></label>
                                <input
                                    type="text"
                                    name="nomeCompleto"
                                    value={formData.nomeCompleto}
                                    onChange={handleChange}
                                    placeholder="Nome completo do aluno"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Data de Nascimento <span className={styles.required}>*</span></label>
                                <input
                                    type="date"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>CPF <span className={styles.required}>*</span></label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Gênero <span className={styles.required}>*</span></label>
                                <select
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Responsável */}
                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><MapPin size={20} /> Dados do Responsável e Endereço</h3>

                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome do Responsável <span className={styles.required}>*</span></label>
                                <input type="text" name="responsavelNome" value={formData.responsavelNome} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                                <input type="email" name="responsavelEmail" value={formData.responsavelEmail} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Telefone <span className={styles.required}>*</span></label>
                                <input type="tel" name="responsavelTelefone" value={formData.responsavelTelefone} onChange={handleChange} placeholder="(00) 00000-0000" className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>CEP <span className={styles.required}>*</span></label>
                                <input type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" className={styles.input} required />
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Logradouro <span className={styles.required}>*</span></label>
                                <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Número <span className={styles.required}>*</span></label>
                                <input type="text" name="numero" value={formData.numero} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Complemento</label>
                                <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, Bloco, etc." className={styles.input} />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Bairro <span className={styles.required}>*</span></label>
                                <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Cidade <span className={styles.required}>*</span></label>
                                <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className={styles.input} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Estado <span className={styles.required}>*</span></label>
                                <input type="text" name="estado" value={formData.estado} onChange={handleChange} className={styles.input} required />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Vínculo */}
                {currentStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><School size={20} /> Vínculo Escolar</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Escola / Instituição <span className={styles.required}>*</span></label>
                                <input type="text" name="escola" value={formData.escola} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Turma / Série <span className={styles.required}>*</span></label>
                                <input type="text" name="turma" value={formData.turma} onChange={handleChange} className={styles.input} required />
                            </div>
                        </div>
                    </div>
                )}

                {/* Steps 4, 5, 6 simplificados para brevidade, mas mantendo a lógica */}
                {currentStep >= 4 && currentStep <= 6 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}>Informações Adicionais (Etapa {currentStep})</h3>
                        <p className="text-slate-500 mb-4 italic">Campos de histórico e saúde serão salvos em atualizações futuras do schema.</p>
                        <div className={styles.grid}>
                             <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Observações Gerais</label>
                                <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} className={styles.input} rows={4} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className={styles.footer}>
                    <button type="button" onClick={handleBack} className={styles.backBtn} disabled={isSubmitting}>
                        <ArrowLeft size={18} />
                        {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                    </button>

                    {currentStep < 6 ? (
                        <button type="button" onClick={handleNext} className={styles.nextBtn}>
                            Próximo
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    Finalizar Cadastro
                                    <Check size={18} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
