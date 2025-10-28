import { COLORS } from "@/constants/Colors";
import { useFetchAlbums } from "@/hooks/useFetchAlbums";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text, // <-- Thêm Text để báo lỗi
  View,
} from "react-native";

import { AlbumCard } from "./AlbumCart";
import SectionHeader from "./SectionHeader";

// Chỉ giữ lại styles mà NewAlbums cần
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    minHeight: 190, // Đặt chiều cao để không bị giật khi load
    paddingVertical: 8, // Thêm padding dọc
  },
  loadingCard: {
    width: 150,
    height: 150,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: COLORS.card, // Dùng màu card thay vì secondary
    opacity: 0.7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  errorText: {
    color: COLORS.error,
    paddingHorizontal: 16,
    marginTop: 20,
  }
});

const NewAlbums: React.FC = () => {
  const { albums, isLoading, error: errorAlbums } = useFetchAlbums();

  // Xóa toàn bộ logic animation khỏi đây

  // Hàm render skeleton (loading)
  const renderLoading = () => (
    <FlatList
      data={Array(5).fill(0)} // Tạo 5 thẻ loading
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <View style={styles.loadingCard} />}
    />
  );

  // Hàm render khi có data
  const renderList = () => (
    <FlatList
      data={albums}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      // Chỉ cần render component con
      renderItem={({ item }): React.ReactElement => (
        <AlbumCard item={item} />
      )}
    />
  );

  // Hàm render khi có lỗi
  const renderError = () => (
      <Text style={styles.errorText}>
          Lỗi khi tải albums: {errorAlbums}
      </Text>
  );

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="New Albums" />
      {/* Logic render 3 trạng thái: Loading, Error, Success */}
      {isLoading ? renderLoading() : (
          errorAlbums ? renderError() : renderList()
      )}
    </View>
  );
};

export default NewAlbums;