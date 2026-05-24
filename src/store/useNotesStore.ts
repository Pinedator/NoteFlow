import { create } from 'zustand';

export type NoteType = 'note' | 'task' | 'reminder';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  createdAt: number;
}

interface NotesStore {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}));