import { COLORS } from "@/constants/Colors";
import { useAudio } from "@/contexts/AudioContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { currentSong, isPlaying, togglePlayPause, playNext, playPrevious } =
    useAudio();
  if (!currentSong) return null;

  return (
    <View
      style={[
        nowPlayingBarStyles.nowPlayingContainer,
        { bottom: insets.bottom + TAB_BAR_HEIGHT },
      ]}
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
  );
};

export default NowPlayingBar;
