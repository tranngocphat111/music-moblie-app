import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Feather from "react-native-vector-Ioniconss/Feather";
// import Ionicons from "react-native-vector-Ioniconss/IonIoniconss";

import { COLORS } from "@/constants/Colors";

import AppHeader from "@/components/home/AppHeader";
import GeezWeekly from "@/components/home/GeezWeekly";
import NewAlbums from "@/components/home/NewAlbums";
import NowPlayingBar from "@/components/home/NowPlayingBar";
import RecentlyMusic from "@/components/home/RecentlyMusic";
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
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
    paddingHorizontal: 16,
  },
});

const HomeScreen: React.FC = () => {
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader />
        <NewAlbums />
        <GeezWeekly />
        <RecentlyMusic />
      </ScrollView>

      <NowPlayingBar />
      <TabBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
