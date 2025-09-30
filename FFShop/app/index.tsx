import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(drawer)/(tabs)/home')
    }, 100); // Delay 100ms để layout kịp mount

    return () => clearTimeout(timer);
  }, [router]);

  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Đang vào shop...</Text>
  </View>
);

}