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
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  nowPlayingImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nowPlayingText: {
    flex: 1,
    marginLeft: 10,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.background,
  },
  nowPlayingControls: {
    marginHorizontal: 16,
  },
});

const NowPlayingBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 70;
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
            <Text style={{ color: COLORS.secondaryText }} numberOfLines={1}>
              {currentSong.artist?.name ?? ""}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={playPrevious}>
          <Ionicons name="play-skip-back" size={22} color={COLORS.background} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlayPause}
          style={nowPlayingBarStyles.nowPlayingControls}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={22}
            color={COLORS.background}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <Ionicons
            name="play-skip-forward"
            size={22}
            color={COLORS.background}
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
