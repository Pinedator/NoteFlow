# NoteFlow

App de productividad móvil construida con React Native y Expo. Permite capturar ideas, gestionar tareas y guardar notas rápidas desde el móvil.

## Tecnologías

- **React Native** con Expo SDK 56
- **Expo Router** para navegación basada en archivos
- **Zustand** para estado global
- **AsyncStorage** para persistencia local
- **FlashList** de Shopify para listas de alto rendimiento
- **React Native Paper** como sistema de diseño (Material Design 3)
- **Reanimated** para animaciones
- **Zod** para validación de formularios

## Funcionalidades

- Tres tipos de contenido: notas, tareas con checklist e ideas con etiquetas
- Búsqueda en tiempo real en cada pestaña
- Persistencia local: los datos se guardan aunque se cierre la app
- Animaciones de entrada y salida en las tarjetas
- Feedback táctil con Haptics
- Soporte para modo oscuro y claro
- Pantallas de detalle con navegación dinámica

## Instalación

```bash
git clone https://github.com/pinedator/NoteFlow.git
cd NoteFlow
npm install
npx expo start
```

## Estructura del proyecto

```
src/
├── app/          # Rutas y navegación (Expo Router)
│   ├── (tabs)/   # Pestañas principales
│   └── nueva-nota.tsx  # Modal de creación
├── components/   # Componentes reutilizables
├── store/        # Estado global con Zustand
├── hooks/        # Hooks personalizados
└── constants/    # Tema y tokens de diseño
docs/
├── idea.md              # Definición del producto
└── react-native-teoria.md  # Documentación técnica
```