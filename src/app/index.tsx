import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteCard from '../components/NoteCard';
import { colors, spacing, typography } from '../constants';
import { Note, useNotesStore } from '../store/useNotesStore';

export default function HomeScreen() {
  const { notes, deleteNote } = useNotesStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NoteFlow</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add')}>
          <Text style={styles.addBtnText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={notes}
        // @ts-ignore
        estimatedItemSize={120}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Note }) => (
          <NoteCard note={item} onDelete={deleteNote} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay notas aún</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  addBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});