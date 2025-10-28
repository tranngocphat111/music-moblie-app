import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AccountHeader from "@/components/account/AccountHeader";
import ProfileInfo from "@/components/account/ProfileInfo";
import LibrarySection from "@/components/account/LibrarySection";
import RecentActivity from "@/components/account/RecentActivity";
import NowPlayingBar from "@/components/NowPlayingBar";
import TabBar from "@/components/TabBar";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <AccountHeader />
          <ProfileInfo />
          <LibrarySection />
          <RecentActivity />
        </ScrollView>
      </SafeAreaView>
      <NowPlayingBar />
      <TabBar />
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Nền chính
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 150,
  },
});
