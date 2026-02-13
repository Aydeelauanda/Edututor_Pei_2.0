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

    const handleChange = (e: any) => {
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
            console.error('Erro:', err);
            setError(err.message || 'Erro ao salvar. Verifique a conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => { if (currentStep < 6) setCurrentStep(prev => prev + 1); };
    const handleBack = () => { if (currentStep > 1) setCurrentStep(prev => prev - 1); else onCancel(); };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Novo Aluno/PEI</h2>
                <p className={styles.subtitle}>Etapa {currentStep} de 6</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Aqui ficam os campos do formulário (mantenha os que já existem) */}
                <div className="p-4">
                   {currentStep === 1 && (
                       <div>
                           <label className="block text-sm font-bold mb-2">Nome Completo</label>
                           <input name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} className="w-full p-2 border rounded" required />
                       </div>
                   )}
                   {/* ... outros steps ... */}
                </div>

                {error && <div className="text-red-500 p-4 font-bold">⚠️ {error}</div>}

                <div className={styles.actions}>
                    <button type="button" onClick={handleBack} className={styles.button} disabled={isSubmitting}>Voltar</button>
                    {currentStep < 6 ? (
                        <button type="button" onClick={handleNext} className={styles.button}>Próximo</button>
                    ) : (
                        <button type="submit" className={styles.button} disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : 'Finalizar'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
