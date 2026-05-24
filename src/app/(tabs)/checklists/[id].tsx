import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text, useTheme } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNotesStore';

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { checklists, deleteChecklist, toggleChecklistItem } = useNotesStore();
  const checklist = checklists.find((c) => c.id === id);

  if (!checklist) return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text>Tarea no encontrada</Text>
    </View>
  );

  const handleToggle = (itemId: string) => {
    toggleChecklistItem(checklist.id, itemId);
    const allCompleted = checklist.items.every((i) => i.isCompleted);
    if (allCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleDelete = () => {
    Alert.alert('Eliminar tarea', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteChecklist(checklist.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 16 }}>
        {checklist.title}
      </Text>
      {checklist.items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Checkbox
            status={item.isCompleted ? 'checked' : 'unchecked'}
            onPress={() => handleToggle(item.id)}
          />
          <Text
            variant="bodyLarge"
            style={{
              color: item.isCompleted ? theme.colors.onSurfaceVariant : theme.colors.onBackground,
              textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            }}
          >
            {item.text}
          </Text>
        </View>
      ))}
      <Button mode="contained" buttonColor={theme.colors.error} onPress={handleDelete} style={styles.btn}>
        Eliminar
      </Button>
      <Button mode="text" onPress={() => router.back()} style={styles.btn}>
        Volver
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  btn: { marginTop: 16 },
});