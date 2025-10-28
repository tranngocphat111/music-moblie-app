import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
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
}: PlayerModalProps) {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const lyricScrollViewRef = useRef<ScrollView>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const lyricCenterPadding = Math.max(
    0,
    (height -
      (insets.top +
        ESTIMATED_HEADER_HEIGHT +
        ESTIMATED_LYRICS_TITLE_HEIGHT +
        ESTIMATED_CONTROLS_HEIGHT)) /
      2 -
      ESTIMATED_LYRIC_LINE_HEIGHT / 2
  );

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
            : "..."}
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
            contentContainerStyle={[
              styles.lyricsContainer,
              {
                paddingTop: lyricCenterPadding,
                paddingBottom: lyricCenterPadding,
                minHeight:
                  height -
                  insets.top -
                  ESTIMATED_HEADER_HEIGHT -
                  ESTIMATED_CONTROLS_HEIGHT -
                  ESTIMATED_LYRICS_TITLE_HEIGHT,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {selectedSong.lyric.map((line: LyricLine, index: number) => (
              <Text
                key={index}
                style={[
                  styles.lyricLine,
                  index === currentLyricIndex && styles.highlightedLyric,
                ]}
              >
                {line.text}
              </Text>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  };

  if (!selectedSong) return null;

  return (
    <Modal animationType="slide" visible={true} onRequestClose={onClose}>
      <SafeAreaView style={[styles.modalContainer, { paddingTop: insets.top }]}>
        <View style={[styles.headerContainer, { marginBottom: 10 }]}>
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

        <PlayerControls
          isPlaying={isPlaying}
          positionMillis={positionMillis}
          durationMillis={durationMillis}
          onSeekStart={onSeekStart}
          onSeekComplete={onSeekComplete}
          onPlayPausePress={onPlayPausePress}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#0c0c0f",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "#888",
  },
  activePaginationDot: {
    backgroundColor: "#FFF",
  },
  pageContent: {
    width: width,
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  modalCover: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    marginVertical: 40,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 30,
    color: "#fff",
  },
  modalArtist: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 16,
  },
  currentLyricText: {
    fontSize: 14,
    color: "#9DFE00",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
    height: 40,
    lineHeight: 20,
  },
  playerActionsTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  lyricsBackground: {
    width: width,
    flex: 1,
    resizeMode: "cover",
  },
  lyricsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
  },
  lyricsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 15,
    height: ESTIMATED_LYRICS_TITLE_HEIGHT - 40,
  },
  lyricsScrollView: {
    width: "100%",
    flex: 1,
  },
  lyricsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  lyricLine: {
    fontSize: 18,
    color: "#eee",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  highlightedLyric: {
    color: "#9DFE00",
    fontWeight: "bold",
    fontSize: 20,
  },
});
