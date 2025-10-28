import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0a0e27" },
        }}
      >
        Expo Router sẽ tự động thêm các màn hình trong /app
        <Stack.Screen name="index" />
        <Stack.Screen name="home/home-screen" />
        <Stack.Screen name="search/SearchScreen" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auths)" />
        <Stack.Screen name="songs/SongScreen" />
        <Stack.Screen name="(account)" />
      </Stack>
    </>
  );
}
