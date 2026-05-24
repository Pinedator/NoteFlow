import { View } from 'react-native';

import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    router.replace('/(tabs)/notas' as any);
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#F8F8FF' }} />;
}