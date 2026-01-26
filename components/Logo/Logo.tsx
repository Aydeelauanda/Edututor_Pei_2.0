import React, { useState } from 'react';
import styles from './Logo.module.css';
import { School } from 'lucide-react';

export const Logo: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className={styles.container}>
      {!imgError ? (
        <img 
          src="/assets/images/edututor_logo.jpeg" 
          alt="EduTutor PEI Logo" 
          className={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-3">
           <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white">
             <School size={20} />
           </div>
           <span className="font-black text-primary text-xl tracking-tighter italic">EduTutor<span className="text-secondary">PEI</span></span>
        </div>
      )}
    </div>
  );
};