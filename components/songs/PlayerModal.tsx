import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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

  const handleLyricPress = (time: number, index: number) => {
    // Single tap - seek to this position
    onSeekComplete(time);
  };

  // Auto scroll lyrics to center the CURRENT PLAYING LINE when currentLyricIndex changes
  useEffect(() => {
    if (
      currentLyricIndex > -1 &&
      lyricScrollViewRef.current &&
      activePageIndex === 1 &&
      selectedSong?.lyric &&
      scrollViewLayout.height > 0
    ) {
      // Each lyric line: lineHeight (20) + marginBottom (26) = 46px
      const LINE_HEIGHT = 46;

      // Calculate the Y position of the current lyric line from the top of content
      const currentLyricY = currentLyricIndex * LINE_HEIGHT;

      // To center the current line in the middle of the viewport:
      // We want the line to be at (scrollViewHeight / 2) - (LINE_HEIGHT / 2) from the top of viewport
      // So we need to scroll to: currentLyricY - (scrollViewHeight / 2) + (LINE_HEIGHT / 2)
      const targetScrollY =
        currentLyricY - scrollViewLayout.height / 2 + LINE_HEIGHT / 2;

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
  ]);

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
        <Image
          source={{ uri: selectedSong.image_url }}
          style={styles.modalCover}
        />
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
      <ImageBackground
        source={{ uri: selectedSong.image_url }}
        style={styles.lyricsBackground}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.lyricsOverlay}>
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
      </ImageBackground>
    );
  };

  if (!selectedSong) return null;

  return (
    <Modal animationType="slide" visible={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={{ paddingTop: insets.top, backgroundColor: "#0a0a0a" }}>
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
            <TouchableOpacity style={{ padding: 8 }}>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
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
        />

        <View
          style={{ paddingBottom: insets.bottom, backgroundColor: "#0c0c0f" }}
        >
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
  modalCover: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 16,
    marginVertical: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 30,
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },
  modalArtist: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 20,
  },
  currentLyricText: {
    fontSize: 16,
    color: "#1DB954",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 40,
    minHeight: 40,
    lineHeight: 22,
    fontWeight: "600",
  },
  playerActionsTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  lyricsBackground: {
    width: width,
    flex: 1,
    resizeMode: "cover",
  },
  lyricsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    alignItems: "center",
  },
  lyricsHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
    marginBottom: 26,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  highlightedLyric: {
    color: "#1DB954",
    fontSize: 18,
    marginBottom: 26,
  },
});
