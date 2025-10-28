import { COLORS } from "@/constants/Colors";
import { Album } from "@/types";
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import SectionHeader from "./SectionHeader";

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
  },
  albumCard: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  albumImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  albumTextOverlay: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryText,
  },
  albumArtist: {
    fontSize: 12,
    color: COLORS.primaryText,
  },
});

const newAlbums: Album[] = [
  {
    id: "1",
    title: "Pray For You",
    artist: "The Weeknd",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    title: "Dua Lipa",
    artist: "Future Nostalgia",
    image:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    title: "After Hours",
    artist: "The Weeknd",
    image: "https://via.placeholder.com/150/FFD700/FFFFFF?Text=Album3",
  },
];

const NewAlbums: React.FC = () => (
  <View style={styles.sectionContainer}>
    <SectionHeader title="New Albums" />
    <FlatList
      data={newAlbums}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }): React.ReactElement => (
        <View style={styles.albumCard}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.albumImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.albumTextOverlay}>
              <Text style={styles.albumTitle}>{item.title}</Text>
              <Text style={styles.albumArtist}>{item.artist}</Text>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  </View>
);

export default NewAlbums;
