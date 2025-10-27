import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Import SafeAreaView và hook từ 'react-native-safe-area-context'
import { Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";

// --- Khai báo Types (Kiểu dữ liệu) ---

const COLORS = {
  background: "#100C2A", // Dark navy/purple background
  card: "#1C183A", // Slightly lighter card background
  primaryText: "#FFFFFF",
  secondaryText: "#A09DAE",
  accent: "#CFFF50", // Bright lime green
  tabBar: "#100C2A",
};

// Kiểu dữ liệu cho một Album
interface Album {
  id: string;
  title: string;
  artist: string;
  image: string; // Sử dụng string cho URI
}

// Kiểu dữ liệu cho một bài hát
interface Song {
  id: string;
  title: string;
  artist: string;
  image: string; // Sử dụng string cho URI
}

// Kiểu dữ liệu cho props của SectionHeader
interface SectionHeaderProps {
  title: string;
}

// --- Dữ liệu mẫu (Dummy Data) ---

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

// << BƯỚC 1: THÊM DỮ LIỆU MỚI CHO GEEZ WEEKLY >>
// Sử dụng chung kiểu 'Album' cho đơn giản
const geezWeeklyData: Album[] = [
  {
    id: "w1",
    title: "Pray For You",
    artist: "The Weeknd",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&h=200&fit=crop", // Ảnh mèo
  },
  {
    id: "w2",
    title: "Summer Vibes",
    artist: "Chillhop Mix",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=200&fit=crop", // Ảnh concert
  },
  {
    id: "w3",
    title: "Lofi Beats",
    artist: "Study Session",
    image:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=400&h=200&fit=crop", // Ảnh tai nghe
  },
];

const recentlyMusic: Song[] = [
  {
    id: "1",
    title: "Nice For What",
    artist: "Awid John",
    image: "https://via.placeholder.com/50/FF6347/FFFFFF?Text=S1",
  },
  {
    id: "2",
    title: "Where can I get some ?",
    artist: "Ariana Grande",
    image: "https://via.placeholder.com/50/ADFF2F/FFFFFF?Text=S2",
  },
  {
    id: "3",
    title: "Why do we use it ?",
    artist: "Alan Walker",
    image: "https://via.placeholder.com/50/1E90FF/FFFFFF?Text=S3",
  },
];

// --- Components có kiểu dữ liệu ---

// Header: "Geez" và Search Icon
const AppHeader: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Geez</Text>
    <Icon name="search-outline" size={26} color={COLORS.primaryText} />
  </View>
);

// Section Header: e.g., "New Albums" và "View all"
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionViewAll}>View all</Text>
  </View>
);

// --- Các phần của màn hình ---

// "New Albums" Section
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

// "Geez Weekly" Section
// << BƯỚC 2: SỬA COMPONENT GEEZWEEKLY ĐỂ DÙNG FLATLIST >>
const GeezWeekly: React.FC = () => (
  <View style={styles.sectionContainer}>
    <SectionHeader title="Geez Weekly" />
    <FlatList
      data={geezWeeklyData} // << Dùng data mới
      horizontal // << Thêm cuộn ngang
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }): React.ReactElement => (
        // << (A) Thêm View wrapper (styles.weeklyCard) để set kích thước và margin >>
        <View style={styles.weeklyCard}>
          <ImageBackground
            source={{ uri: item.image }}
            // << (B) Đổi style của ImageBackground thành "weeklyImage" (100% width/height) >>
            style={styles.weeklyImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.weeklyOverlay}>
              <View style={styles.weeklyBottomBar}>
                <TouchableOpacity style={styles.weeklyPlayButton}>
                  <Icon name="play" size={20} color={COLORS.primaryText} />
                </TouchableOpacity>

                <View style={styles.weeklyTextContainer}>
                  {/* << (C) Dùng dữ liệu động từ 'item' >> */}
                  <Text style={styles.weeklyTitle}>{item.title}</Text>
                  <Text style={styles.weeklyArtist}>{item.artist}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  </View>
);

// "Recently Music" Section
const RecentlyMusic: React.FC = () => (
  <View style={styles.sectionContainer}>
    <SectionHeader title="Recently Music" />
    {recentlyMusic.map((item, index) => (
      <TouchableOpacity key={item.id} style={styles.songItem}>
        <Text style={styles.songIndex}>{`0${index + 1}`}</Text>
        <Image source={{ uri: item.image }} style={styles.songImage} />
        <View style={styles.songTextContainer}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <FeatherIcon
          name="more-horizontal"
          size={24}
          color={COLORS.primaryText}
        />
      </TouchableOpacity>
    ))}
  </View>
);

// --- Các thanh cố định ở dưới ---

// "Now Playing" Bar (Home 1)
const NowPlayingBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 70; // Chiều cao của TabBar

  return (
    <View
      style={[
        styles.nowPlayingContainer,
        { bottom: insets.bottom + TAB_BAR_HEIGHT },
      ]}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=50&h=50&fit=crop",
        }}
        style={styles.nowPlayingImage}
      />
      <View style={styles.nowPlayingText}>
        <Text style={styles.nowPlayingTitle}>Come Back Home</Text>
      </View>
      <Icon name="play-skip-back" size={22} color={COLORS.background} />
      <Icon
        name="play"
        size={22}
        color={COLORS.background}
        style={styles.nowPlayingControls}
      />
      <Icon name="play-skip-forward" size={22} color={COLORS.background} />
    </View>
  );
};

// Bottom Tab Bar
const TabBar: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { bottom: insets.bottom }]}>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="home" size={24} color={COLORS.accent} />
        <Text style={[styles.tabLabel, { color: COLORS.accent }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="compass-outline" size={24} color={COLORS.secondaryText} />
        <Text style={styles.tabLabel}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="radio-outline" size={24} color={COLORS.secondaryText} />
        <Text style={styles.tabLabel}>Radio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="person-outline" size={24} color={COLORS.secondaryText} />
        <Text style={styles.tabLabel}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Component App chính ---

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader />
        <NewAlbums />
        <GeezWeekly />
        <RecentlyMusic />
      </ScrollView>

      <NowPlayingBar />

      <TabBar />
    </SafeAreaView>
  );
};

// --- Styles ---
// << BƯỚC 3: CẬP NHẬT STYLES >>
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryText,
  },
  sectionViewAll: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
  // << (A) TẠO STYLE MỚI (wrapper) CHO CARD >>
  // Style này định nghĩa KÍCH THƯỚC và KHOẢNG CÁCH của card
  weeklyCard: {
    width: 300, // Chiều rộng cho card weekly (lớn hơn album)
    height: 200, // Chiều cao
    marginRight: 16, // Khoảng cách giống albumCard
  },
  // << (B) ĐỔI TÊN STYLE (từ weeklyCard cũ thành weeklyImage) >>
  // Style này cho ImageBackground bên trong, để nó lấp đầy wrapper
  weeklyImage: {
    width: "100%", // Lấp đầy wrapper
    height: "100%", // Lấp đầy wrapper
    borderRadius: 20,
    overflow: "hidden", // Đảm bảo border radius hoạt động
  },
  weeklyOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // Lớp phủ mờ
    borderRadius: 20,
    justifyContent: "flex-end", // Căn bottom bar xuống dưới cùng
  },
  weeklyBottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.6)", // Nền tối hơn cho thanh dưới
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  weeklyPlayButton: {
    width: 35, // Kích thước nút play
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Nền mờ cho nút play
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryText,
  },
  weeklyTextContainer: {
    flex: 1,
    flexDirection: "row", // Sắp xếp title và artist trên cùng một hàng
    justifyContent: "space-between", // Đẩy title sang trái, artist sang phải
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
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160, // Chừa không gian cho NowPlayingBar + TabBar
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primaryText,
  },

  // --- Album Styles (để tham chiếu) ---
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
  // --- End Album Styles ---

  weeklyPlayButtonCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Trắng mờ
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryText,
  },

  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  progressTime: {
    fontSize: 10,
    color: COLORS.secondaryText,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    marginHorizontal: 8,
  },
  progress: {
    width: "80%", // % tiến độ ví dụ
    height: "100%",
    backgroundColor: COLORS.primaryText,
    borderRadius: 2,
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
    borderRadius: 20, // Bo tròn
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
  tabBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: COLORS.tabBar,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
});

export default HomeScreen;
