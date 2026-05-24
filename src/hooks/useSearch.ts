import { useMemo, useState } from 'react';
import { useNotesStore } from '../store/useNotesStore';

export function useSearch() {
  const [query, setQuery] = useState('');
  const { notes, checklists, ideas } = useNotesStore();

  const filteredNotes = useMemo(
    () => notes.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())),
    [notes, query]
  );

  const filteredChecklists = useMemo(
    () => checklists.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
    [checklists, query]
  );

  const filteredIdeas = useMemo(
    () => ideas.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())),
    [ideas, query]
  );

  return { query, setQuery, filteredNotes, filteredChecklists, filteredIdeas };
}