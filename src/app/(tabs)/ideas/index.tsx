import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, Text, useTheme } from 'react-native-paper';
import IdeaCard from '../../../components/items/IdeaCard';
import { useSearch } from '../../../hooks/useSearch';
import { IdeaNote, useNotesStore } from '../../../store/useNotesStore';

export default function IdeasScreen() {
  const { deleteIdea } = useNotesStore();
  const theme = useTheme();
  const { query, setQuery, filteredIdeas } = useSearch();

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar idea', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteIdea(id);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
        Ideas
      </Text>
      <Searchbar
        placeholder="Buscar ideas..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <FlatList
        data={filteredIdeas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: IdeaNote }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/(tabs)/ideas/${item.id}` as any)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay ideas aún</Text>
        }
      />
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