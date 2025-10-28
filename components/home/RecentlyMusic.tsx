import { COLORS } from "@/constants/Colors";
import { useAudio } from "@/contexts/AudioContext";
import { useFetchSongs } from "@/hooks/useFetchSongs";
import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionHeader from "./SectionHeader";

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  songIndex: {
    fontSize: 16,
    color: COLORS.secondaryText,
    width: 30,
  },
  songImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  songTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  songTitle: {
    fontSize: 16,
    color: COLORS.primaryText,
    fontWeight: "500",
  },
  songArtist: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
});

const RecentlyMusic: React.FC = () => {
  const { songs, isLoading, error } = useFetchSongs();
  const audio = useAudio();

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Recently Music" />

      {isLoading && (
        <ActivityIndicator
          size="large"
          color={COLORS.accent}
          style={{ marginVertical: 20 }}
        />
      )}

      {error && (
        <Text style={styles.errorText}>Error loading music: {error}</Text>
      )}

      {!isLoading &&
        !error &&
        songs.map((item, index) => (
          <TouchableOpacity
            key={`${item._id ?? item.song_id ?? index}`}
            style={styles.songItem}
            onPress={async () => {
              try {
                await audio.playSong(item, index, songs);
              } catch (e) {
                console.error("Failed to play song from RecentlyMusic", e);
              }
            }}
          >
            <Text style={styles.songIndex}>{`${index + 1}`}</Text>
            <Image source={{ uri: item.image_url }} style={styles.songImage} />
            <View style={styles.songTextContainer}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.songArtist}>
                {item.artist?.name ?? "Unknown Artist"}
              </Text>
            </View>
            <Feather
              name="more-horizontal"
              size={24}
              color={COLORS.primaryText}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default RecentlyMusic;
