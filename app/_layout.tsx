import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* File app/index.tsx (file test của bạn) */}
        <Stack.Screen name="index" />

        {/* Đại diện cho TOÀN BỘ nhóm app/(onboarding) */}
        <Stack.Screen name="(onboarding)" />

        {/* Đại diện cho TOÀN BỘ nhóm app/(auths) */}
        <Stack.Screen name="(auths)" />

        {/* Bạn sẽ thêm 'home' ở đây NẾU bạn di chuyển app/home.tsx ra ngoài */}
        {/* <Stack.Screen name="home" /> */}
      </Stack>
    </>
  );
}
