import React from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Slide } from "../../constants/slides";

const { width, height } = Dimensions.get("window");

type OnboardingSlideProps = {
  item: Slide;
};

export default function OnboardingSlide({ item }: OnboardingSlideProps) {
  return (
    <ImageBackground
      source={item.image}
      style={styles.slideImage}
      resizeMode="cover"
    >
      <View style={styles.slideContentContainer}>
        <View style={styles.textBlock}>
          {item.preTitle && (
            <Text style={styles.preTitle}>{item.preTitle}</Text>
          )}
          <Text
            style={[
              styles.title,
              item.titleStyle === "large" && styles.titleLarge,
            ]}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  slideImage: {
    width: width,
    height: height,
  },
  slideContentContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa text (giống ảnh 1, 3)
    alignItems: "center",
    padding: 30,
  },
  textBlock: {
    alignItems: "center",
  },
  preTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  titleLarge: {
    fontSize: 70, // Style cho chữ "SPTUNES"
    fontWeight: "900",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: "90%",
  },
});
