import React from 'react';
import styles from './Logo.module.css';
// Importe a imagem aqui
import logoImg from '@/assets/images/edututor_logo.jpeg'; 

export const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <img 
        src={logoImg}  
        alt="EduTutor PEI Logo" 
        className={styles.image}
      />
    </div>
  );
};