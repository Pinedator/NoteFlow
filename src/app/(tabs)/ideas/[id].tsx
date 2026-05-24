import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNotesStore';

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { ideas, deleteIdea } = useNotesStore();
  const idea = ideas.find((i) => i.id === id);

  if (!idea) return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text>Idea no encontrada</Text>
    </View>
  );

  const handleDelete = () => {
    Alert.alert('Eliminar idea', '¿Seguro que quieres eliminarla?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          deleteIdea(idea.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
        {idea.title}
      </Text>
      <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
        {new Date(idea.createdAt).toLocaleDateString()}
      </Text>
      <View style={styles.tags}>
        {idea.tags.map((tag) => (
          <Chip key={tag} compact style={styles.chip}>{tag}</Chip>
        ))}
      </View>
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
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { height: 28 },
  btn: { marginTop: 16 },
});