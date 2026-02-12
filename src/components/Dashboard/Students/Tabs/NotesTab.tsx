import { useState } from 'react';
import { Search, Plus, Filter, MessageSquare, AlertCircle, Clock, Trash2, Edit2, Pin } from 'lucide-react';

interface Note {
    id: string;
    content: string;
    priority: 'Alta' | 'Média' | 'Baixa';
    date: string;
    isPinned?: boolean;
}

export const NotesTab = ({ studentId }: { studentId: string }) => {
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newNote, setNewNote] = useState({ content: '', priority: 'Média' });

    const [notes, setNotes] = useState<Note[]>([
        { id: '1', content: 'Aluno demonstrou grande evolução na coordenação motora fina durante a atividade de pintura.', priority: 'Alta', date: '29/01/2026', isPinned: true },
        { id: '2', content: 'Teve dificuldade em aceitar a mudança na rotina da lancheira hoje.', priority: 'Média', date: '28/01/2026' },
        { id: '3', content: 'Sugerido reforço nas atividades de lógica matemática.', priority: 'Baixa', date: '25/01/2026' },
    ]);

    const handleAddNote = () => {
        if (!newNote.content) return;
        const note: Note = {
            id: Math.random().toString(),
            content: newNote.content,
            priority: newNote.priority as any,
            date: new Date().toLocaleDateString('pt-BR'),
        };
        setNotes([note, ...notes]);
        setNewNote({ content: '', priority: 'Média' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Controls */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm flex flex-col xl:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Pesquisar anotações..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/20 transition-all outline-none font-bold text-sm"
                    />
                </div>
                <div className="flex gap-4 w-full xl:w-auto">
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-primary transition-all">
                        <Filter size={18} /> Filtrar
                    </button>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-[1.05]"
                    >
                        <Plus size={18} strokeWidth={3} /> Nova Anotação
                    </button>
                </div>
            </div>

            {/* Quick Add Form */}
            {isAdding && (
                <div className="bg-primary/5 border-[1.5px] border-primary/20 p-8 rounded-[2.5rem] animate-in slide-in-from-top-4 duration-300 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Conteúdo da Anotação</label>
                            <textarea
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                placeholder="Descreva sua observação aqui..."
                                className="w-full bg-white dark:bg-slate-900 rounded-2xl p-5 text-sm font-bold border-[1.5px] border-transparent focus:border-primary/30 outline-none shadow-sm min-h-[100px]"
                            />
                        </div>
                        <div className="md:w-64 space-y-2">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Prioridade</label>
                            <select
                                value={newNote.priority}
                                onChange={(e) => setNewNote({ ...newNote, priority: e.target.value as any })}
                                className="w-full bg-white dark:bg-slate-900 rounded-2xl px-4 py-4 text-sm font-black border-[1.5px] border-transparent focus:border-primary/30 outline-none appearance-none"
                            >
                                <option value="Baixa">Baixa 🟢</option>
                                <option value="Média">Média 🟡</option>
                                <option value="Alta">Alta 🔴</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600">Cancelar</button>
                        <button onClick={handleAddNote} className="px-8 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">Salvar Observação</button>
                    </div>
                </div>
            )}

            {/* Notes List */}
            <div className="grid grid-cols-1 gap-6">
                {notes.map((note) => (
                    <div key={note.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 hover:border-primary/20 transition-all flex gap-8">
                        <div className="hidden sm:flex flex-col items-center gap-2">
                            <div className={`size-12 rounded-2xl flex items-center justify-center shadow-sm ${note.priority === 'Alta' ? 'bg-red-50 text-red-500' :
                                    note.priority === 'Média' ? 'bg-amber-50 text-amber-500' :
                                        'bg-emerald-50 text-emerald-500'
                                }`}>
                                <AlertCircle size={24} />
                            </div>
                            <div className="h-full w-px bg-slate-100 dark:bg-slate-700" />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${note.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                                            note.priority === 'Média' ? 'bg-amber-100 text-amber-600' :
                                                'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        Prioridade {note.priority}
                                    </span>
                                    {note.isPinned && <Pin size={14} className="text-primary fill-primary" />}
                                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                        <Clock size={12} /> {note.date}
                                    </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-all"><Edit2 size={16} /></button>
                                    <button className="p-2 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                {note.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};