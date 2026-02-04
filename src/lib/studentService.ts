import { supabase } from './supabase';

export interface StudentData {
    id?: string;
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

export interface SchoolData {
    id?: string;
    nome: string;
    cnpj?: string;
    telefone?: string;
    endereco?: string;
}

export interface ProfessionalData {
    id?: string;
    nome: string;
    email: string;
    especialidade: string;
    registro?: string;
    telefone?: string;
}

export const studentService = {
    // --- ALUNOS ---
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
            .insert([{ ...student, user_id: user.id }])
            .select();

        if (error) throw error;
        return data[0];
    },

    async update(id: string, student: Partial<StudentData>) {
        const { data, error } = await supabase
            .from('students')
            .update(student)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('students')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // --- ESCOLAS ---
    async getAllSchools() {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) throw error;
        return data;
    },

    async createSchool(school: SchoolData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('schools')
            .insert([{ ...school, user_id: user.id }])
            .select();

        if (error) throw error;
        return data[0];
    },

    async updateSchool(id: string, school: Partial<SchoolData>) {
        const { data, error } = await supabase
            .from('schools')
            .update(school)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    async deleteSchool(id: string) {
        const { error } = await supabase
            .from('schools')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // --- PROFISSIONAIS ---
    async getAllProfessionals() {
        const { data, error } = await supabase
            .from('professionals')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) throw error;
        return data;
    },

    async createProfessional(professional: ProfessionalData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('professionals')
            .insert([{ ...professional, user_id: user.id }])
            .select();

        if (error) throw error;
        return data[0];
    },

    async updateProfessional(id: string, professional: Partial<ProfessionalData>) {
        const { data, error } = await supabase
            .from('professionals')
            .update(professional)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    async deleteProfessional(id: string) {
        const { error } = await supabase
            .from('professionals')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
