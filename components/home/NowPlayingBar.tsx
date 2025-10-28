import { COLORS } from "@/constants/Colors";
import { useAudio } from "@/contexts/AudioContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlayerModal } from "../songs/PlayerModal";

const nowPlayingBarStyles = StyleSheet.create({
  nowPlayingContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    height: 60,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 0,
  },
  nowPlayingImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  nowPlayingText: {
    flex: 1,
    marginLeft: 12,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },
  nowPlayingArtist: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "500",
  },
  nowPlayingControls: {
    marginHorizontal: 12,
  },
});

const NowPlayingBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 80; // Tăng lên để không bị che
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    positionMillis,
    durationMillis,
    currentLyricIndex,
    seekTo,
  } = useAudio();

  if (!currentSong) return null;

  return (
    <>
      <View
        style={[
          nowPlayingBarStyles.nowPlayingContainer,
          { bottom: insets.bottom + TAB_BAR_HEIGHT },
        ]}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", flex: 1 }}
          onPress={() => setIsModalVisible(true)}
        >
          <Image
            source={{ uri: currentSong.image_url }}
            style={nowPlayingBarStyles.nowPlayingImage}
          />
          <View style={nowPlayingBarStyles.nowPlayingText}>
            <Text style={nowPlayingBarStyles.nowPlayingTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={nowPlayingBarStyles.nowPlayingArtist} numberOfLines={1}>
              {currentSong.artist?.name ?? ""}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={playPrevious}>
          <Ionicons name="play-skip-back" size={22} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlayPause}
          style={nowPlayingBarStyles.nowPlayingControls}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={22}
            color="#000000"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <Ionicons
            name="play-skip-forward"
            size={22}
            color="#000000"
          />
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <PlayerModal
          selectedSong={currentSong}
          isPlaying={isPlaying}
          positionMillis={positionMillis}
          durationMillis={durationMillis}
          currentLyricIndex={currentLyricIndex}
          onClose={() => setIsModalVisible(false)}
          onSeekStart={() => {}}
          onSeekComplete={(position) => seekTo(position)}
          onPlayPausePress={togglePlayPause}
          onNext={playNext}
          onPrevious={playPrevious}
        />
      )}
    </>
  );
};

export default NowPlayingBar;
