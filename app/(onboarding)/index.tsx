// app/index.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    image: require("../../assets/images/onboarding/onboarding_1.jpg"),
    title: "GEEZ MUSIC",
    preTitle: null,
    subtitle: "Discover and stream your favorite songs anytime, anywhere",
    titleStyle: "large",
  },
  {
    key: "2",
    image: require("../../assets/images/onboarding/onboarding_2.png"),
    preTitle: "APP UI KIT",
    title: "WELCOME TO GEEZ APP",
    subtitle: "Organize your playlists and enjoy seamless music experience",
    titleStyle: "normal",
  },
  {
    key: "3",
    image: require("../../assets/images/onboarding/onboarding_3.png"),
    preTitle: "APP UI KIT",
    title: "DISCOVER NEW TRACKS",
    subtitle: "Explore trending songs and discover music you love",
    titleStyle: "normal",
  },
  {
    key: "4",
    image: require("../../assets/images/onboarding/onboarding_4.png"),
    preTitle: "APP UI KIT",
    title: "ENJOY OFFLINE MODE",
    subtitle: "Download your favorite songs and listen without internet",
    titleStyle: "normal",
  },
];
type Slide = (typeof slides)[0];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  // 2. Xử lý sự kiện khi nhấn "GET STARTED"
  const handleGetStarted = () => {
    // Sử dụng 'replace' để thay thế màn hình onboarding
    // Điều này ngăn người dùng nhấn "Back" quay lại onboarding
    router.replace("/sign-in");
    // (Bạn cần tạo file app/home.tsx hoặc app/(tabs) cho màn hình chính)
  };

  // 3. Theo dõi slide hiện tại để cập nhật dấu chấm
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  // 4. Hàm render mỗi slide
  const renderSlide = ({ item }: { item: Slide }) => (
    <ImageBackground
      source={item.image}
      style={styles.slideImage}
      resizeMode="cover"
    >
      {/* Container chứa text */}
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* 5. FlatList để trượt ngang */}
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled // Quan trọng: bật chế độ lật trang
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        style={styles.flatList}
      />

      {/* 6. Phần Dấu chấm (Dots) và Nút (Button) */}
      <SafeAreaView style={styles.bottomOverlay}>
        {/* Dấu chấm */}
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

        {/* Nút */}
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

// 7. StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  flatList: {
    flex: 1,
  },
  slideImage: {
    width: width,
    height: height,
  },
  slideContentContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa text (giống ảnh 1, 3)
    alignItems: "center",
    padding: 30,
    // Để căn text xuống dưới (giống ảnh 2, 4), dùng:
    // justifyContent: 'flex-end',
    // paddingBottom: 200, // Chừa không gian cho nút và dots
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
    fontSize: 70, // Style cho chữ "GEEZ"
    fontWeight: "900",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: "90%",
  },
  // Lớp phủ cho nút và dots
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingBottom: 10, // Thêm padding cho an toàn
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
    backgroundColor: "#CFFC00", // Màu xanh neon
    width: 20, // Chấm active dài hơn
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 8,
  },
  button: {
    backgroundColor: "#CFFC00", // Màu xanh neon
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
