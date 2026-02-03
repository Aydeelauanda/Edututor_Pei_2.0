import { supabase } from './supabase';

export interface StudentData {
    nome: string;
    data_nascimento: string;
    cpf: string;
    genero: string;
    escola: string;
    serie?: string;
    cid?: string;
    responsavel_nome: string;
    responsavel_email: string;
    responsavel_telefone: string;
}

export const studentService = {
    async getAll() {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) throw error;
        return data;
    },

    async create(student: StudentData) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('students')
            .insert([
                { ...student, user_id: user.id }
            ])
            .select();

        if (error) throw error;
        return data[0];
    }
};
