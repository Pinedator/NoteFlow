# Teoría React Native — NoteFlow

## React Native vs App Nativa
React Native no renderiza HTML en un WebView. Convierte los componentes
de React en vistas nativas reales del sistema operativo. Esto le da el
aspecto y rendimiento de una app nativa, pero con código JavaScript.

La arquitectura tiene dos hilos:
- **JS thread**: donde corre tu código React y la lógica de negocio.
- **UI thread**: donde se renderizan los componentes nativos del SO.

Cuando el JS thread se bloquea, la interfaz se congela. Por eso evitamos
operaciones pesadas en el hilo principal.

## Metro Bundler
Metro es el empaquetador de JavaScript de React Native. Transforma y
agrupa tu código para que el dispositivo pueda ejecutarlo. Es equivalente
a Webpack en proyectos web.

## Por qué Expo Go no es suficiente en proyectos reales
Expo Go solo soporta las librerías incluidas en su SDK. En cuanto usas
código nativo personalizado (como react-native-mmkv), necesitas una
build propia con EAS Build o expo-dev-client.

## Sistemas de diseño
Elegimos **React Native Paper** porque implementa Material Design de
forma completa y lista para usar. Acelera el desarrollo sin sacrificar
calidad visual, y tiene soporte nativo para modo oscuro y claro.

## Gestión de estado
| Opción | Cuándo usarla |
|---|---|
| useState | Estado local de un componente |
| Context API | Estado compartido simple, poco frecuente |
| Zustand | Estado global complejo, múltiples consumidores |

Zustand no requiere providers anidados y evita re-renders innecesarios.

## Rendimiento en listas
FlatList recicla componentes pero de forma poco eficiente en listas largas.
FlashList de Shopify recicla de forma más agresiva usando estimatedItemSize
para predecir el tamaño de cada elemento antes de renderizarlo.

## Navegación
- **Tabs**: navegación principal entre secciones (Notas, Tareas, Ideas).
- **Stack**: navegación en profundidad dentro de una sección (lista → detalle).
- **Modal**: creación de nuevo contenido sin perder el contexto actual.

## Persistencia y rehidratación
Al abrir la app, Zustand lee AsyncStorage de forma asíncrona. Durante ese
proceso el store está vacío. Para evitar mostrar contenido vacío, se puede
usar el método onRehydrateStorage del middleware persist para mostrar un
indicador de carga hasta que los datos estén disponibles.