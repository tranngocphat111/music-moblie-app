import React, { useState, useRef } from "react";
import { View, FlatList, StyleSheet, ViewToken } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { slides, Slide } from "../../constants/slides";
import OnboardingSlide from "../../components/onboarding/OnboardingSlide";
import BottomControls from "../../components/onboarding/BottomControls";

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/sign-in");
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

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
});
