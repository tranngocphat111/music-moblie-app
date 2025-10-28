import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Song = any;

interface SongListProps {
  songs: Song[];
  selectedSong: Song | null;
  isPlaying: boolean;
  onSongPress: (song: Song) => void;
}

export function SongList({
  songs,
  selectedSong,
  isPlaying,
  onSongPress,
}: SongListProps) {
  return (
    <FlatList
      data={songs || []}
      keyExtractor={(item) => item.song_id.toString()}
      renderItem={({ item }) => {
        const artistName = item.artist.name;
        return (
          <TouchableOpacity
            style={[
              styles.card,
              selectedSong?.song_id === item.song_id && styles.selectedCard,
            ]}
            onPress={() => onSongPress(item)}
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
  );
}

const styles = StyleSheet.create({
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
  cover: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  artist: {
    fontSize: 13,
    color: "#aaa",
  },
});
