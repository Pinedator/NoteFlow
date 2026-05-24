import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, Text, useTheme } from 'react-native-paper';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { useSearch } from '../../../hooks/useSearch';
import { ChecklistNote, useNotesStore } from '../../../store/useNotesStore';

export default function ChecklistsScreen() {
  const { deleteChecklist } = useNotesStore();
  const theme = useTheme();
  const { query, setQuery, filteredChecklists } = useSearch();

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar tarea', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteChecklist(id);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
        Tareas
      </Text>
      <Searchbar
        placeholder="Buscar tareas..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <FlashList
        data={filteredChecklists}
        // @ts-ignore
        estimatedItemSize={120}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => router.push(`/(tabs)/checklists/${item.id}` as any)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay tareas aún</Text>
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