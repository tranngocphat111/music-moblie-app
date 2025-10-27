// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Đặt StatusBar ở đây để áp dụng chung */}
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auths)/sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="(auths)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auths)/forgot-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
