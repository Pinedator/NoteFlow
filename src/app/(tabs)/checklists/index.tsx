import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote, useNotesStore } from '../../../store/useNotesStore';

export default function ChecklistsScreen() {
  const { checklists, deleteChecklist } = useNotesStore();
  const theme = useTheme();

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
      <FlashList
        data={checklists}
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
  empty: { textAlign: 'center', marginTop: 40, opacity: 0.5 },
  fab: { position: 'absolute', bottom: 24, right: 16 },
});