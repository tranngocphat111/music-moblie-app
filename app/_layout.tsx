import { AudioProvider } from "@/contexts/AudioContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AudioProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0a0e27" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auths)" />
          <Stack.Screen name="(modals)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="home/home-screen" />
          <Stack.Screen name="songs/SongScreen" />
        </Stack>
      </AudioProvider>
    </AuthProvider>
  );
}
