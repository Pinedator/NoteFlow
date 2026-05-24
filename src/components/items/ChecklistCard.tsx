import { StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar, Text, useTheme } from 'react-native-paper';
import { ChecklistNote } from '../../store/useNotesStore';

interface Props {
  checklist: ChecklistNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function ChecklistCard({ checklist, onPress, onDelete }: Props) {
  const theme = useTheme();
  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total === 0 ? 0 : completed / total;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>{checklist.title}</Text>
      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
        {completed}/{total} tareas completadas
      </Text>
      <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progress} />
      <TouchableOpacity onPress={onDelete} style={styles.delete}>
        <Text variant="labelSmall" style={{ color: theme.colors.error }}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  progress: {
    marginTop: 10,
    borderRadius: 4,
  },
  delete: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});