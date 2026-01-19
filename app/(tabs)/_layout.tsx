import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Esto hará que tus pantallas se vean a pantalla completa */}
      <Stack.Screen name="index" /> 
    </Stack>
  );
}