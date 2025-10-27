import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false, // ẩn header mặc định
          contentStyle: { backgroundColor: "#0a0e27" }, // màu nền mặc định
        }}
      >
        {/* Expo Router sẽ tự động thêm các màn hình trong /app */}
        <Stack.Screen name="index" />
        <Stack.Screen name="home/HomeScreen" />
        <Stack.Screen name="search/SearchScreen" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auths)" />
      </Stack>
    </>
  );
}
