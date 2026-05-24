import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../constants';
import { NoteType, useNotesStore } from '../store/useNotesStore';

const types: NoteType[] = ['note', 'task', 'reminder'];
const typeLabel: Record<NoteType, string> = {
  note: '📝 Nota',
  task: '✅ Tarea',
  reminder: '🔔 Recordatorio',
};

export default function AddScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<NoteType>('note');
  const addNote = useNotesStore((s) => s.addNote);

  const handleSave = () => {
    if (!title.trim()) return;
    addNote({
      id: Date.now().toString(),
      title,
      content,
      type,
      createdAt: Date.now(),
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva nota</Text>

      <View style={styles.types}>
        {types.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextActive]}>
              {typeLabel[t]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.textSecondary}
      />

      <TextInput
        style={[styles.input, styles.inputMulti]}
        placeholder="Contenido"
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.textSecondary}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    paddingTop: spacing.xl * 2,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  types: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeBtnText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  typeBtnTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    color: colors.text,
    ...typography.body,
  },
  inputMulti: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: spacing.md,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    ...typography.body,
    fontWeight: '600',
  },
});