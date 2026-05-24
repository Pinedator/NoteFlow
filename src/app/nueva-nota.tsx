import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { useNotesStore } from '../store/useNotesStore';

const noteSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    content: z.string().min(1, 'El contenido no puede estar vacío'),
});

type TabType = 'note' | 'checklist' | 'idea';

const IDEA_COLORS = ['#7C3AED', '#DB2777', '#059669', '#2563EB', '#D97706'];

export default function NuevaNotaScreen() {
    const theme = useTheme();
    const [type, setType] = useState<TabType>('note');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [color, setColor] = useState(IDEA_COLORS[0]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { addNote, addChecklist, addIdea } = useNotesStore();

    const handleSave = () => {
        setErrors({});

        if (type === 'note') {
            const result = noteSchema.safeParse({ title, content });
            if (!result.success) {
                const fieldErrors: Record<string, string> = {};
                result.error.issues.forEach((e) => {
                    fieldErrors[String(e.path[0])] = e.message;
                });
                setErrors(fieldErrors);
                return;
            }
            addNote({ id: Date.now().toString(), title, content, createdAt: Date.now() });
        }

        if (type === 'checklist') {
            if (title.length < 3) {
                setErrors({ title: 'El título debe tener al menos 3 caracteres' });
                return;
            }
            const items = content.split('\n').filter(Boolean).map((text, i) => ({
                id: `${Date.now()}-${i}`,
                text,
                isCompleted: false,
            }));
            addChecklist({ id: Date.now().toString(), title, items, createdAt: Date.now() });
        }

        if (type === 'idea') {
            if (title.length < 3) {
                setErrors({ title: 'El título debe tener al menos 3 caracteres' });
                return;
            }
            const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
            addIdea({ id: Date.now().toString(), title, tags: tagList, color, createdAt: Date.now() });
        }

        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={[styles.container, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={styles.content}
            >
                <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 16 }}>
                    Nueva nota
                </Text>

                <SegmentedButtons
                    value={type}
                    onValueChange={(v) => setType(v as TabType)}
                    buttons={[
                        { value: 'note', label: '📝 Nota' },
                        { value: 'checklist', label: '✅ Tarea' },
                        { value: 'idea', label: '💡 Idea' },
                    ]}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="Título"
                    value={title}
                    onChangeText={setTitle}
                    mode="outlined"
                    style={styles.input}
                    error={!!errors.title}
                />
                {errors.title && <Text style={{ color: theme.colors.error, marginBottom: 8 }}>{errors.title}</Text>}

                {type === 'note' && (
                    <>
                        <TextInput
                            label="Contenido"
                            value={content}
                            onChangeText={setContent}
                            mode="outlined"
                            multiline
                            numberOfLines={5}
                            style={styles.input}
                            error={!!errors.content}
                        />
                        {errors.content && <Text style={{ color: theme.colors.error, marginBottom: 8 }}>{errors.content}</Text>}
                    </>
                )}

                {type === 'checklist' && (
                    <TextInput
                        label="Items (uno por línea)"
                        value={content}
                        onChangeText={setContent}
                        mode="outlined"
                        multiline
                        numberOfLines={5}
                        style={styles.input}
                    />
                )}

                {type === 'idea' && (
                    <>
                        <TextInput
                            label="Etiquetas (separadas por comas)"
                            value={tags}
                            onChangeText={setTags}
                            mode="outlined"
                            style={styles.input}
                        />
                        <Text variant="labelLarge" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
                            Color
                        </Text>
                        <View style={styles.colors}>
                            {IDEA_COLORS.map((c) => (
                                <View
                                    key={c}
                                    onTouchEnd={() => setColor(c)}
                                    style={[styles.colorDot, { backgroundColor: c, borderWidth: color === c ? 3 : 0, borderColor: theme.colors.primary }]}
                                />
                            ))}
                        </View>
                    </>
                )}

                <Button mode="contained" onPress={handleSave} style={styles.btn}>
                    Guardar
                </Button>
                <Button mode="text" onPress={() => router.back()} style={styles.btn}>
                    Cancelar
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 16, paddingTop: 60 },
    input: { marginBottom: 8 },
    btn: { marginTop: 8 },
    colors: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    colorDot: { width: 36, height: 36, borderRadius: 18 },
});