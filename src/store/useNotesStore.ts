import { create } from 'zustand';
import { createNote, deleteNote, getNotes } from '../lib/api';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'checklist' | 'idea';
  color?: string;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote {
  id: string;
  title: string;
  items: ChecklistItem[];
  createdAt: number;
}

export interface IdeaNote {
  id: string;
  title: string;
  tags: string[];
  color: string;
  createdAt: number;
}

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  isLoading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (data: { title: string; content?: string }) => Promise<void>;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  deleteNote: (id: string) => Promise<void>;
  deleteChecklist: (id: string) => void;
  deleteIdea: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  checklists: [],
  ideas: [],
  isLoading: false,
  error: null,

  fetchNotes: async () => {
  set({ isLoading: true, error: null });
  try {
    const notes = await getNotes();
    console.log('Notas recibidas:', notes);
    set({ notes, isLoading: false });
  } catch (e) {
    console.log('Error:', e);
    set({ error: 'Error al cargar notas', isLoading: false });
  }
},

  addNote: async (data) => {
    try {
      const note = await createNote({ ...data, type: 'note' });
      set((state) => ({ notes: [note, ...state.notes] }));
    } catch (e) {
      set({ error: 'Error al crear nota' });
    }
  },

  addChecklist: (checklist) => set((state) => ({ checklists: [checklist, ...state.checklists] })),
  addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),

  deleteNote: async (id) => {
    try {
      await deleteNote(id);
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    } catch (e) {
      set({ error: 'Error al eliminar nota' });
    }
  },

  deleteChecklist: (id) => set((state) => ({ checklists: state.checklists.filter((c) => c.id !== id) })),
  deleteIdea: (id) => set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),

  toggleChecklistItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id !== checklistId ? c : {
          ...c,
          items: c.items.map((i) =>
            i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
          ),
        }
      ),
    })),
}));