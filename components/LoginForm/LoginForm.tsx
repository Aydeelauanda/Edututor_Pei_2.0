import React, { useState } from 'react';
import { AtSign, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === 'Invalid login credentials' 
          ? 'E-mail ou senha incorretos.' 
          : authError.message
        );
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>E-mail Institucional</label>
          <div className={styles.inputWrapper}>
            <div className={styles.iconLeft}><AtSign size={18} /></div>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="nome@instituicao.com.br"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Senha de Acesso</label>
            <button 
              type="button" 
              onClick={onForgotPassword}
              className={styles.forgotLink}
            >
              Esqueci a senha
            </button>
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.iconLeft}><Lock size={18} /></div>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button disabled={isLoading} type="submit" className={styles.submitBtn}>
          {isLoading ? (
            <Loader2 className={styles.spin} size={20} />
          ) : (
            'Entrar na plataforma'
          )}
        </button>
      </form>
    </div>
  );
};