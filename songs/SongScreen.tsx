// src/screens/Index.tsx

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import { DATA } from "../../data/data";

export type LyricLine = {
  time: number;
  text: string;
};

const { width, height } = Dimensions.get("window");

const ESTIMATED_HEADER_HEIGHT = 50; // SafeAreaView + padding
const ESTIMATED_CONTROLS_HEIGHT = 120; // ControlsWrapper
const ESTIMATED_LYRICS_TITLE_HEIGHT = 70; // "Lyrics" Header + margin
const ESTIMATED_LYRIC_LINE_HEIGHT = 40; // line height + margin (đã fix)

type Song = (typeof DATA.songs)[0];

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const flatListRef = useRef<FlatList>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const lyricScrollViewRef = useRef<ScrollView>(null);

  // Tính toán vị trí offset cần thiết để căn giữa Lyric một cách linh hoạt
  const lyricCenterOffset = useMemo(() => {
    const spaceAboveScrollView =
      ESTIMATED_HEADER_HEIGHT + ESTIMATED_LYRICS_TITLE_HEIGHT;
    
    // Chiều cao khả dụng cho phần lyrics (trừ đi header và controls)
    const availableHeight = height - ESTIMATED_CONTROLS_HEIGHT - spaceAboveScrollView;
    
    // Tính center offset dựa trên chiều cao khả dụng
    return Math.max(availableHeight * 0.4, ESTIMATED_LYRIC_LINE_HEIGHT * 3);
  }, [height]);

  // ... (useEffect cho Audio Mode giữ nguyên)
  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });
      } catch (e) {
        console.error("Lỗi cài đặt audio mode:", e);
      }
    };
    setupAudioMode();
  }, []);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const playSong = async (song: Song) => {
    if (selectedSong?.song_id === song.song_id && isPlaying) {
      setSelectedSong(song);
      return;
    }
    await stopSong();
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.audio_url },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 }
      );
      setSound(newSound);
      setSelectedSong(song);
      setIsPlaying(true);
      setPositionMillis(0);
      setCurrentLyricIndex(-1);

      const currentLyrics = song.lyric;

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          stopSong();
          return;
        }
        if (!isSeeking) setPositionMillis(status.positionMillis);
        setDurationMillis(status.durationMillis || 0);
        setIsPlaying(status.isPlaying);

        const currentTime = status.positionMillis / 1000;
        let newIndex = -1;

        if (currentLyrics) {
          for (let i = 0; i < currentLyrics.length; i++) {
            if (currentTime >= currentLyrics[i].time) newIndex = i;
            else break;
          }
        }

        setCurrentLyricIndex((prevIndex) => {
          if (newIndex !== prevIndex && newIndex !== -1) {
            if (lyricScrollViewRef.current) {
              // Tính toán vị trí scroll để căn giữa lyric đang active
              const lineHeight = ESTIMATED_LYRIC_LINE_HEIGHT;
              const currentLinePosition = newIndex * lineHeight;
              
              // Tính chiều cao khả dụng cho lyrics (trừ đi header, controls và lyrics title)
              const availableHeight = height - ESTIMATED_HEADER_HEIGHT - 
                ESTIMATED_CONTROLS_HEIGHT - ESTIMATED_LYRICS_TITLE_HEIGHT;
              
              // Tính vị trí center mục tiêu
              const targetCenter = availableHeight / 2;
              
              // Tính offset để dòng hiện tại nằm giữa khu vực hiển thị
              const offset = Math.max(
                0,
                currentLinePosition - targetCenter + lineHeight
              );

              lyricScrollViewRef.current.scrollTo({
                y: offset,
                animated: true,
              });
            }
            return newIndex;
          }
          return prevIndex;
        });
      });
    } catch (error) {
      console.error("Lỗi phát nhạc:", error);
      await stopSong();
    }
  };

  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    setSound(null);
    setPositionMillis(0);
    setIsPlaying(false);
    setCurrentLyricIndex(-1);
  };

  const closeModal = () => {
    stopSong();
    setSelectedSong(null);
    setDurationMillis(0);
    setActivePageIndex(0);
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const onSeekStart = () => setIsSeeking(true);
  const onSeekComplete = async (value: number) => {
    if (sound) await sound.setPositionAsync(value);
    setPositionMillis(value);
    setIsSeeking(false);
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActivePageIndex(Math.round(index));
  };

  const getArtistName = (artistId: number) => {
    const artist = DATA.artists.find((art) => art.artist_id === artistId);
    return artist ? artist.name : "Không rõ nghệ sĩ";
  };

  // --- Trang 1: Player ---
  const renderPlayerPage = () => {
    if (!selectedSong) return null;
    const artistName = getArtistName(selectedSong.artist_id);

    return (
      <View style={styles.pageContent}>
        <Image
          source={{ uri: selectedSong.image_url }}
          style={styles.modalCover}
        />
        <Text style={styles.modalTitle}>{selectedSong.title}</Text>
        <Text style={styles.modalArtist}>{artistName}</Text>

        {/* Dòng lyric hiện tại */}
        <Text style={styles.currentLyricText} numberOfLines={2}>
          {currentLyricIndex > -1 && selectedSong.lyric[currentLyricIndex]
            ? selectedSong.lyric[currentLyricIndex].text
            : "..."}
        </Text>

        {/* Các nút share, list, heart, download */}
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

  // --- Trang 2: Lyrics ---
  const renderLyricsPage = () => {
    if (!selectedSong || !selectedSong.lyric) return null;

    // Chiều cao padding trên/dưới được tính từ lyricCenterOffset
    const paddingTopForCenter =
      lyricCenterOffset - ESTIMATED_LYRIC_LINE_HEIGHT / 2;

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
                // Padding trên để đảm bảo dòng đầu tiên có thể cuộn lên giữa màn hình
                paddingTop: lyricCenterOffset,
                // Padding dưới để đảm bảo dòng cuối cùng có thể cuộn lên giữa
                paddingBottom: lyricCenterOffset,
                minHeight: height - ESTIMATED_HEADER_HEIGHT - ESTIMATED_CONTROLS_HEIGHT,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {selectedSong.lyric.map((line, index) => (
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Danh sách bài hát</Text>
      <FlatList
        data={DATA.songs}
        keyExtractor={(item) => item.song_id.toString()}
        renderItem={({ item }) => {
          const artistName = getArtistName(item.artist_id);
          return (
            <TouchableOpacity
              style={[
                styles.card,
                selectedSong?.song_id === item.song_id && styles.selectedCard,
              ]}
              onPress={() => playSong(item)}
            >
              <Image source={{ uri: item.image_url }} style={styles.cover} />
              <View style={styles.cardInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{artistName}</Text>
              </View>
              {selectedSong?.song_id === item.song_id && isPlaying && (
                <Ionicons
                  name="volume-medium-outline"
                  size={24}
                  color="#9DFE00"
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* --- MODAL PLAYER --- */}
      {selectedSong && (
        <Modal animationType="slide" visible={true} onRequestClose={closeModal}>
          <SafeAreaView style={[styles.modalContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={[styles.headerContainer, { marginBottom: 10 }]}>
              <TouchableOpacity 
                onPress={closeModal}
                style={{ padding: 8 }}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              {/* Pagination (2 chấm) */}
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
              {/* Nút 3 chấm (More options) */}
              <TouchableOpacity style={{ padding: 8 }}>
                <Ionicons name="ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* FlatList cho các trang (Player / Lyrics) */}
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

            {/* Thanh điều khiển (cố định ở dưới) */}
            <View style={[styles.controlsWrapper, { paddingBottom: Math.max(insets.bottom + 10, 20) }]}>
              <View style={styles.sliderContainer}>
                <Text style={styles.timeText}>
                  {formatTime(positionMillis)}
                </Text>
                <Slider
                  style={styles.slider}
                  value={positionMillis}
                  minimumValue={0}
                  maximumValue={durationMillis}
                  minimumTrackTintColor="#9DFE00"
                  maximumTrackTintColor="#555"
                  thumbTintColor="#9DFE00"
                  onSlidingStart={onSeekStart}
                  onSlidingComplete={onSeekComplete}
                />
                <Text style={styles.timeText}>
                  {formatTime(durationMillis)}
                </Text>
              </View>

              <View style={styles.controlsContainer}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="shuffle"
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="play-skip-back" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={togglePlayPause}
                  style={styles.playButton}
                >
                  <Ionicons
                    name={isPlaying ? "pause-outline" : "play-outline"}
                    size={40}
                    color="#000"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="play-skip-forward" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="repeat"
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  // --- Global / List Styles ---
  container: { flex: 1, paddingTop: 50, backgroundColor: "#0c0c0f" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    marginHorizontal: 20,
  },
  selectedCard: {
    backgroundColor: "#2a2a2a",
    borderColor: "#9DFE00",
    borderWidth: 1,
  },
  cover: { width: 60, height: 60, borderRadius: 8 },
  cardInfo: { flex: 1, marginLeft: 10, marginRight: 10 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  artist: { fontSize: 13, color: "#aaa" },

  // --- Modal Structure ---
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
    height: ESTIMATED_HEADER_HEIGHT, // Dùng hằng số
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

  // --- Page Content (Player / Lyrics) ---
  pageContent: {
    width: width,
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },

  // --- Page 1: Player (Ảnh 3) ---
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

  // --- Page 2: Lyrics ---
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
    justifyContent: "center",
    flexGrow: 1,
    // THAY ĐỔI: Đảm bảo container có đủ không gian để căn giữa
    minHeight: height - ESTIMATED_HEADER_HEIGHT - ESTIMATED_CONTROLS_HEIGHT - ESTIMATED_LYRICS_TITLE_HEIGHT,
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

  // --- Controls Wrapper (Cố định) ---
  controlsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0c0c0f",
    paddingTop: 15,
    paddingBottom: 30, // Tăng padding bottom để không bị sát màn hình
    borderTopWidth: 1,
    borderTopColor: "#1e1e1e",
    height: ESTIMATED_CONTROLS_HEIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#ccc",
    width: 40,
    textAlign: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#9DFE00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
