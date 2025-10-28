import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlayerControls } from "./PlayerControls";

const { width, height } = Dimensions.get("window");

const ESTIMATED_HEADER_HEIGHT = 50;
const ESTIMATED_CONTROLS_HEIGHT = 120;
const ESTIMATED_LYRICS_TITLE_HEIGHT = 50;
const ESTIMATED_LYRIC_LINE_HEIGHT = 40;

type Song = any;
type LyricLine = {
  time: number;
  text: string;
};

interface PlayerModalProps {
  selectedSong: Song | null;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  currentLyricIndex: number;
  onClose: () => void;
  onSeekStart: () => void;
  onSeekComplete: (value: number) => void;
  onPlayPausePress: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function PlayerModal({
  selectedSong,
  isPlaying,
  positionMillis,
  durationMillis,
  currentLyricIndex,
  onClose,
  onSeekStart,
  onSeekComplete,
  onPlayPausePress,
  onNext,
  onPrevious,
}: PlayerModalProps) {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const lyricScrollViewRef = useRef<ScrollView>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [scrollViewLayout, setScrollViewLayout] = useState({ height: 0 });
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Reset rotation when song changes
  useEffect(() => {
    rotateAnim.setValue(0);
  }, [selectedSong?.song_id]);

  // Rotate the album cover when playing
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 10000, // 10 seconds for one full rotation
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [isPlaying, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleLyricPress = (time: number, index: number) => {
    // Convert time from seconds to milliseconds
    const timeInMillis = time * 1000;
    // Single tap - seek to this position
    onSeekComplete(timeInMillis);
    // Re-enable auto-scroll after seeking
    setIsUserScrolling(false);
  };

  // Handle manual scroll (Scrubbing)
  const handleScrollBeginDrag = () => {
    // User started scrolling manually - disable auto-scroll
    setIsUserScrolling(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  const handleScrollEndDrag = () => {
    // User stopped scrolling - re-enable auto-scroll after 3 seconds
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Synchronization: Auto scroll lyrics to center the CURRENT PLAYING LINE
  useEffect(() => {
    if (
      currentLyricIndex > -1 &&
      lyricScrollViewRef.current &&
      activePageIndex === 1 &&
      selectedSong?.lyric &&
      scrollViewLayout.height > 0 &&
      !isUserScrolling // Only auto-scroll if user is not manually scrolling
    ) {
      // Calculate responsive line height based on screen size
      const fontSize = width > 400 ? 20 : 18;
      const lineHeight = width > 400 ? 20 : 18;
      const marginBottom = height * 0.032; // Responsive margin
      const estimatedLineHeight = fontSize + marginBottom;

      // Calculate the Y position of the current lyric line from the top of content
      const currentLyricY = currentLyricIndex * estimatedLineHeight;

      // To center the current line in the middle of the viewport:
      const targetScrollY =
        currentLyricY - scrollViewLayout.height / 2 + estimatedLineHeight / 2;

      lyricScrollViewRef.current?.scrollTo({
        y: Math.max(0, targetScrollY),
        animated: true,
      });
    }
  }, [
    currentLyricIndex,
    activePageIndex,
    selectedSong,
    scrollViewLayout.height,
    isUserScrolling,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActivePageIndex(Math.round(index));
  };

  const renderPlayerPage = () => {
    if (!selectedSong) return null;
    const artistName = selectedSong.artist.name;

    return (
      <View style={styles.pageContent}>
        <View style={styles.albumContainer}>
          <View style={styles.vinylEffect}>
            <Animated.Image
              source={{ uri: selectedSong.image_url }}
              style={[
                styles.modalCover,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.modalTitle}>{selectedSong.title}</Text>
        <Text style={styles.modalArtist}>{artistName}</Text>
        <Text style={styles.currentLyricText} numberOfLines={2}>
          {currentLyricIndex > -1 &&
          selectedSong.lyric &&
          selectedSong.lyric[currentLyricIndex]
            ? selectedSong.lyric[currentLyricIndex].text
            : ""}
        </Text>

        <View style={styles.playerActionsTop}>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="list-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLyricsPage = () => {
    if (!selectedSong || !selectedSong.lyric) return null;

    return (
      <View style={styles.lyricsPageContainer}>
        <Text style={styles.lyricsHeader}>Lyrics</Text>
        <ScrollView
          ref={lyricScrollViewRef}
          style={styles.lyricsScrollView}
          contentContainerStyle={styles.lyricsContainer}
          showsVerticalScrollIndicator={false}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setScrollViewLayout({ height });
          }}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {selectedSong.lyric.map((line: LyricLine, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLyricPress(line.time, index)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.lyricLine,
                  index === currentLyricIndex && styles.highlightedLyric,
                ]}
              >
                {line.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (!selectedSong) return null;

  return (
    <Modal animationType="slide" visible={true} onRequestClose={onClose}>
      <LinearGradient
        colors={["#1DB954", "#0a0a0a"]}
        style={styles.modalContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.3]}
      >
        <View style={{ flex: 1, paddingTop: insets.top }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.paginationContainer}>
              <View
                style={[
                  styles.paginationDot,
                  activePageIndex === 0 && styles.activePaginationDot,
                ]}
              />
              <View
                style={[
                  styles.paginationDot,
                  activePageIndex === 1 && styles.activePaginationDot,
                ]}
              />
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={[1, 2]}
            renderItem={({ index }) =>
              index === 0 ? renderPlayerPage() : renderLyricsPage()
            }
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
          />

          <View style={{ paddingBottom: insets.bottom }}>
            <PlayerControls
              isPlaying={isPlaying}
              positionMillis={positionMillis}
              durationMillis={durationMillis}
              onSeekStart={onSeekStart}
              onSeekComplete={onSeekComplete}
              onPlayPausePress={onPlayPausePress}
              onNext={onNext}
              onPrevious={onPrevious}
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    height: ESTIMATED_HEADER_HEIGHT,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    zIndex: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activePaginationDot: {
    width: 20,
    backgroundColor: "#fff",
  },
  pageContent: {
    width: width,
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
    justifyContent: "center",
  },
  albumContainer: {
    position: "relative",
    marginVertical: height * 0.035,
  },
  vinylEffect: {
    position: "relative",
    borderRadius: width > 400 ? (width * 0.7) / 2 : (width * 0.65) / 2,
    padding: 4, // Reduced padding
    backgroundColor: "rgba(29, 185, 84, 0.05)", // More subtle glow
    shadowColor: "#1DB954",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3, // Reduced shadow opacity
    shadowRadius: 15,
    elevation: 10,
  },
  modalCover: {
    width: width > 400 ? width * 0.7 : width * 0.65, // Smaller size
    height: width > 400 ? width * 0.7 : width * 0.65,
    borderRadius: width > 400 ? (width * 0.7) / 2 : (width * 0.65) / 2,
    borderWidth: 2, // Thinner border
    borderColor: "#2a2a2a", // Lighter border color
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 15,
  },
  modalTitle: {
    fontSize: width > 400 ? 26 : 22, // Responsive font size
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 30,
    color: "#fff",
    marginTop: height * 0.024, // Responsive margin
    marginBottom: height * 0.01,
  },
  modalArtist: {
    fontSize: width > 400 ? 16 : 14, // Responsive font size
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: height * 0.024,
  },
  currentLyricText: {
    fontSize: width > 400 ? 16 : 14, // Responsive font size
    color: "#1DB954",
    textAlign: "center",
    marginBottom: height * 0.024,
    paddingHorizontal: 40,
    minHeight: height * 0.05, // Responsive min height
    lineHeight: width > 400 ? 22 : 20,
    fontWeight: "600",
  },
  playerActionsTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    paddingHorizontal: 20,
    marginTop: height * 0.012, // Responsive margin
    marginBottom: height * 0.024,
  },
  lyricsPageContainer: {
    width: width,
    flex: 1,
    alignItems: "center",
    paddingTop: height * 0.024,
  },
  lyricsHeader: {
    fontSize: width > 400 ? 20 : 18, // Responsive font size
    fontWeight: "700",
    color: "#fff",
    marginTop: height * 0.024, // Responsive margin
    marginBottom: height * 0.024,
    letterSpacing: 1,
  },
  lyricsScrollView: {
    width: "100%",
    flex: 1,
  },
  lyricsContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  lyricLine: {
    fontSize: width > 400 ? 16 : 14, // Responsive font size
    color: "rgba(255, 255, 255, 0.7)", // Brighter text for better visibility
    textAlign: "center",
    marginBottom: height * 0.032, // Responsive spacing (approximately 26px on standard screens)
    lineHeight: width > 400 ? 20 : 18,
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Add text shadow for depth
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  highlightedLyric: {
    color: "#1DB954",
    fontSize: width > 400 ? 16 : 14,
    fontWeight: "700", // In đậm
    marginBottom: height * 0.032,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  controlsBackgroundLayer: {
    // Đặt layer này dưới nội dung PlayerControls
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0c0c0f", // Màu nền ban đầu (màu đen) // Lưu ý: Độ mờ sẽ được điều chỉnh bởi Animated.View
  },
});
