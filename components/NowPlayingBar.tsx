import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
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

  return (
    <View
      style={[
        nowPlayingBarStyles.nowPlayingContainer,
        { bottom: insets.bottom + TAB_BAR_HEIGHT },
      ]}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=50&h=50&fit=crop",
        }}
        style={nowPlayingBarStyles.nowPlayingImage}
      />
      <View style={nowPlayingBarStyles.nowPlayingText}>
        <Text style={nowPlayingBarStyles.nowPlayingTitle}>Come Back Home</Text>
      </View>
      <Ionicons name="play-skip-back" size={22} color={COLORS.background} />
      <Ionicons
        name="play"
        size={22}
        color={COLORS.background}
        style={nowPlayingBarStyles.nowPlayingControls}
      />
      <Ionicons name="play-skip-forward" size={22} color={COLORS.background} />
    </View>
  );
};

export default NowPlayingBar;
