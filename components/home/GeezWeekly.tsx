import { COLORS } from "@/constants/Colors";
import { Album } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    ImageBackground,
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
  weeklyCard: {
    width: 300,
    height: 200,
    marginRight: 16,
  },
  weeklyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  weeklyOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    justifyContent: "flex-end",
  },
  weeklyBottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  weeklyPlayButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryText,
  },
  weeklyTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryText,
  },
  weeklyArtist: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
});

const geezWeeklyData: Album[] = [
    {
      id: "w1",
      title: "Pray For You",
      artist: "The Weeknd",
      image:
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&h=200&fit=crop",
    },
    {
      id: "w2",
      title: "Summer Vibes",
      artist: "Chillhop Mix",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=200&fit=crop",
    },
    {
      id: "w3",
      title: "Lofi Beats",
      artist: "Study Session",
      image:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=400&h=200&fit=crop",
    },
  ];

const GeezWeekly: React.FC = () => (
  <View style={styles.sectionContainer}>
    <SectionHeader title="Geez Weekly" />
    <FlatList
      data={geezWeeklyData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }): React.ReactElement => (
        <View style={styles.weeklyCard}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.weeklyImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.weeklyOverlay}>
              <View style={styles.weeklyBottomBar}>
                <TouchableOpacity style={styles.weeklyPlayButton}>
                  <Ionicons name="play" size={20} color={COLORS.primaryText} />
                </TouchableOpacity>
                <View style={styles.weeklyTextContainer}>
                  <Text style={styles.weeklyTitle}>{item.title}</Text>
                  <Text style={styles.weeklyArtist}>
                    {item.artist}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  </View>
);

export default GeezWeekly;
