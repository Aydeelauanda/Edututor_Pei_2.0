import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
// CORREÇÃO: Caminho relativo direto para o CSS que está na mesma pasta
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

    public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <AlertTriangle size={48} className={styles.icon} />
            </div>
            
            <h1 className={styles.title}>Ops! Algo deu errado</h1>
            <p className={styles.message}>
              Pedimos desculpas pelo inconveniente. Ocorreu um erro inesperado na aplicação.
            </p>
            
            {this.state.error && (
              <div className={styles.errorDetails}>
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className={styles.actions}>
              <button onClick={this.handleReload} className={styles.buttonPrimary}>
                <RefreshCw size={18} />
                Tentar Novamente
              </button>
              <button onClick={this.handleReset} className={styles.buttonSecondary}>
                <Home size={18} />
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    // CORREÇÃO AQUI: Garantindo que o retorno seja um ReactNode válido
    return this.props.children;
  }
}

export default ErrorBoundary;
