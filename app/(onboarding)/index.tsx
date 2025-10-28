// app/onboarding.tsx
import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, StyleSheet, ViewToken } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { slides, Slide } from "../../constants/slides";
import OnboardingSlide from "../../components/onboarding/OnboardingSlide";
import BottomControls from "../../components/onboarding/BottomControls";

const ONBOARDING_KEY = "hasSeenOnboarding";

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (value === "true") {
          router.replace("/sign-in");
        } else {
          setHasSeenOnboarding(false);
        }
      } catch (err) {
        console.error("Lỗi đọc AsyncStorage:", err);
        setHasSeenOnboarding(false);
      }
    };

    checkOnboarding();
  }, [router]);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      router.replace("/sign-in");
    } catch (err) {
      console.error("Lỗi lưu AsyncStorage:", err);
      router.replace("/sign-in");
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  if (hasSeenOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
      </View>
    );
  }

  if (hasSeenOnboarding === true) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={slides}
        renderItem={({ item }: { item: Slide }) => (
          <OnboardingSlide item={item} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={styles.flatList}
      />
      <BottomControls
        slides={slides}
        activeIndex={activeIndex}
        onPressGetStarted={handleGetStarted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  flatList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
