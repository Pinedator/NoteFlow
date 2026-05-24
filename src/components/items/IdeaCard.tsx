import { Pressable, StyleSheet, View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { IdeaNote } from '../../store/useNotesStore';

interface Props {
  idea: IdeaNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function IdeaCard({ idea, onPress, onDelete }: Props) {
  const theme = useTheme();

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutLeft}>
      <Pressable
        onPress={onPress}
        style={[styles.card, { backgroundColor: idea.color, borderColor: theme.colors.outlineVariant }]}
      >
        <Text variant="titleMedium" style={{ color: '#fff' }}>{idea.title}</Text>
        <View style={styles.tags}>
          {idea.tags.map((tag) => (
            <Chip key={tag} compact style={styles.chip}>{tag}</Chip>
          ))}
        </View>
        <Text variant="labelSmall" style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
          {new Date(idea.createdAt).toLocaleDateString()}
        </Text>
        <Pressable onPress={onDelete} style={styles.delete}>
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  chip: {
    height: 28,
  },
  delete: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});