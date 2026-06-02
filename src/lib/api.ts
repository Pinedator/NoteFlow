const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://note-flow-api.vercel.app/api';

export async function getNotes() {
  const res = await fetch(`${BASE_URL}/notes`);
  if (!res.ok) throw new Error('Error al cargar notas');
  return res.json();
}

export async function createNote(data: {
  title: string;
  type: 'note' | 'checklist' | 'idea';
  content?: string;
  color?: string;
}) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear nota');
  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar nota');
}