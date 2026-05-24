import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
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
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  deleteNote: (id: string) => void;
  deleteChecklist: (id: string) => void;
  deleteIdea: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      addChecklist: (checklist) => set((state) => ({ checklists: [checklist, ...state.checklists] })),
      addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
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
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);