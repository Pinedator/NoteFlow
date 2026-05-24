import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNotesStore';

export default function NotaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { notes, deleteNote } = useNotesStore();
  const note = notes.find((n) => n.id === id);

  if (!note) return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text>Nota no encontrada</Text>
    </View>
  );

  const handleDelete = () => {
    console.log('HANDLE DELETE CALLED');
    Alert.alert('Eliminar nota', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteNote(note.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
        {note.title}
      </Text>
      <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
        {new Date(note.createdAt).toLocaleDateString()}
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
        {note.content}
      </Text>
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
  btn: { marginTop: 16 },
});