import { Album } from "@/types";
import { useEffect, useState } from "react";
import { useFetchArtists } from "./useFetchArtists";
import { useFetchSongs } from "./useFetchSongs";

export const useFetchAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { songs, isLoading: loadingSongs, error: errorSongs } = useFetchSongs();
  const { artists } = useFetchArtists();

  useEffect(() => {
    try {
      // Chỉ xử lý khi có songs và artists
      if (songs && songs.length > 0 && artists && artists.length > 0) {
        const albumMap = new Map<number, Album>();

        for (const song of songs) {
          // Chỉ xử lý nếu song VÀ song.album đều tồn tại
          if (song && song.album) {
            const albumId = song.album.album_id;

            // Nếu album này CHƯA có trong Map
            if (!albumMap.has(albumId)) {
              // Lấy artist name từ song
              const artistName = song.artist?.name || "Unknown Artist";

              // Tạo Album object
              const newAlbum: Album = {
                id: String(albumId),
                title: song.album.title,
                artist: artistName,
                image: song.image_url || "",
              };

              albumMap.set(albumId, newAlbum);
            }
          }
        }

        // Chuyển Map thành mảng
        setAlbums(Array.from(albumMap.values()));
        setError(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      console.error("Error processing albums:", err);
    } finally {
      setIsLoading(loadingSongs);
    }
  }, [songs, artists, loadingSongs]);

  return { albums, isLoading, error: error || errorSongs };
};