// Import `Album` (target) và `Song` (source) từ types
import { Album } from "@/types"; // Đảm bảo Song cũng được import nếu nó ở file khác
import { useEffect, useState } from "react";
// KHÔNG CẦN API_URL nữa
import { useFetchSongs } from "./useFetchSongs";

export const useFetchAlbums = () => {
  // 1. Lấy dữ liệu gốc từ useFetchSongs
  const { songs, isLoading, error } = useFetchSongs();

  // 2. Tạo một state riêng để chứa danh sách album đã lọc
  const [albums, setAlbums] = useState<Album[]>([]);

  // 3. Sử dụng useEffect để xử lý việc lọc BẤT CỨ KHI NÀO `songs` thay đổi
  useEffect(() => {
    // Chỉ xử lý khi có `songs` và không còn loading
    if (songs && songs.length > 0 && !isLoading) {
      
      const albumMap = new Map<number, Album>();

      for (const song of songs) {

        // --- ⬇️ BẢN SỬA LỖI NẰM Ở ĐÂY ⬇️ ---
        
        // Chỉ xử lý nếu song VÀ song.album đều tồn tại (không bị null hay undefined)
        if (song && song.album) { 
          const albumId = song.album.album_id;

          // Nếu album này CHƯA có trong Map
          if (!albumMap.has(albumId)) {
            
            // Thêm một bước kiểm tra an toàn cho artist
            const artistName = song.artist ? song.artist.name : "Unknown Artist";

            // Tạo một object Album mới theo đúng interface bạn yêu cầu
            const newAlbum: Album = {
              id: String(albumId),
              title: song.album.title,
              artist: artistName, // Sử dụng tên nghệ sĩ đã kiểm tra
              image: song.image_url, // Lấy ảnh của bài hát ĐẦU TIÊN
            };
            
            // Thêm vào Map
            albumMap.set(albumId, newAlbum);
          }
        }
        // Nếu 'song.album' không tồn tại, vòng lặp sẽ tự động bỏ qua
        // và chuyển sang bài hát tiếp theo, tránh bị crash.

        // --- ⬆️ KẾT THÚC BẢN SỬA LỖI ⬆️ ---
      }

      // 4. Chuyển Map (các values) trở lại thành mảng và set state
      setAlbums(Array.from(albumMap.values()));
    }
  }, [songs, isLoading, error]); // Phụ thuộc vào kết quả của useFetchSongs

  // 5. Trả về danh sách album đã lọc và trạng thái loading/error gốc
  return { albums, isLoading, error };
};