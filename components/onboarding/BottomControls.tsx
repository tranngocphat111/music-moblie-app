import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slide } from "../../constants/slides";

type BottomControlsProps = {
  slides: Slide[];
  activeIndex: number;
  onPressGetStarted: () => void;
};

export default function BottomControls({
  slides,
  activeIndex,
  onPressGetStarted,
}: BottomControlsProps) {
  return (
    <SafeAreaView style={styles.bottomOverlay}>
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {activeIndex === slides.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={onPressGetStarted}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#CFFC00",
    width: 20,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 8,
  },
  button: {
    backgroundColor: "#CFFC00",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
