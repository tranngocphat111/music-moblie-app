import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/Colors";

import AppHeader from "@/components/home/AppHeader";
import NewAlbums from "@/components/home/NewAlbums";
import NowPlayingBar from "@/components/home/NowPlayingBar";
import RecentlyMusic from "@/components/home/RecentlyMusic";
import SPTunesWeekly from "@/components/home/SPTunesWeekly";
import TabBar from "@/components/home/TabBar";

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
  },
  loadingText: {
    color: COLORS.secondaryText,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 160,
    paddingHorizontal: 16,
  },
});

const HomeScreen: React.FC = () => {
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <LinearGradient
        colors={['#1DB954', '#0d5c2f', '#0a3d1f', '#121212']}
        locations={[0, 0.15, 0.25, 0.4]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppHeader />
          <NewAlbums />
          <SPTunesWeekly />
          <RecentlyMusic />
        </ScrollView>

        <NowPlayingBar />
        <TabBar />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
