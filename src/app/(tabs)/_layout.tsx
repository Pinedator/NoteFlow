import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
      }}
    >
      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen
        name="checklists/index"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen
        name="ideas/index"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
    </Tabs>
  );
}