import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../constants';
import { Note } from '../store/useNotesStore';

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}

const typeLabel: Record<string, string> = {
  note: '📝 Nota',
  task: '✅ Tarea',
  reminder: '🔔 Recordatorio',
};

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.type}>{typeLabel[note.type]}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.delete}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  type: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  content: {
    ...typography.body,
    color: colors.textSecondary,
  },
  delete: {
    marginTop: spacing.sm,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: colors.error,
    fontSize: 13,
  },
});