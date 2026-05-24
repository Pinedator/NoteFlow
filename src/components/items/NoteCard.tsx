import { Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { Note } from '../../store/useNotesStore';

interface Props {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onPress, onDelete }: Props) {
  const theme = useTheme();

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutLeft}>
      <Pressable
        onPress={onPress}
        style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}
      >
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>{note.title}</Text>
        <Text variant="bodySmall" numberOfLines={2} style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
          {note.content}
        </Text>
        <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>
        <Pressable onPress={() => { console.log('DELETE PRESSED'); onDelete(); }} style={styles.delete}>
          <Text variant="labelSmall" style={{ color: theme.colors.error }}>Eliminar</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  delete: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});