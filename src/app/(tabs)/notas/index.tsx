import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Searchbar, Text, useTheme } from 'react-native-paper';
import NoteCard from '../../../components/items/NoteCard';
import { useSearch } from '../../../hooks/useSearch';
import { Note, useNotesStore } from '../../../store/useNotesStore';

export default function NotasScreen() {
  const { deleteNote, fetchNotes, isLoading } = useNotesStore();
  const theme = useTheme();
  const { query, setQuery, filteredNotes } = useSearch();

  useEffect(() => {
    console.log('useEffect ejecutado');
    fetchNotes();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar nota', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteNote(id);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
        Notas
      </Text>
      <Searchbar
        placeholder="Buscar notas..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlashList
          data={filteredNotes}
          // @ts-ignore
          estimatedItemSize={120}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Note }) => (
            <NoteCard
              note={item}
              onPress={() => router.push(`/(tabs)/notas/${item.id}` as any)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay notas aún</Text>
          }
        />
      )}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/nueva-nota' as any)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  title: { marginBottom: 16 },
  search: { marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 40, opacity: 0.5 },
  fab: { position: 'absolute', bottom: 24, right: 16 },
});