import { API_URL } from "@/constants/Api";
import axios from "axios";
import { useEffect, useState } from "react";

interface Album {
  album_id: number;
  title: string;
  release_date: string;
}

interface Artist {
  artist_id: number;
  name: string;
}

interface Song {
  song_id: number;
  title: string;
  duration: number;
  image_url: string;
  audio_url: string;
  artist: Artist;
  album: Album;
}

interface ArtistWithSongs extends Artist {
  songs: Song[];
  image_url?: string; // Using the first song's image as the artist's image
}

export const useFetchArtists = () => {
  const [artists, setArtists] = useState<ArtistWithSongs[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        // First, fetch all songs
        const response = await axios.get<Song[]>(`${API_URL}/songs`);
        const songs = response.data;

        // Create a map to group songs by artist_id
        const artistMap = new Map<number, ArtistWithSongs>();

        // Process each song to build artist data
        songs.forEach((song) => {
          const artistId = song.artist.artist_id;
          
          if (!artistMap.has(artistId)) {
            // Create new artist entry with their first song
            artistMap.set(artistId, {
              artist_id: artistId,
              name: song.artist.name,
              songs: [song],
              image_url: song.image_url // Use first song's image as artist image
            });
          } else {
            // Add song to existing artist's songs array
            const artist = artistMap.get(artistId)!;
            artist.songs.push(song);
          }
        });

        // Convert map to array
        const artistsArray = Array.from(artistMap.values());

        setArtists(artistsArray);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []); // Empty dependency array means this effect runs once on mount

  return {
    artists,
    loading,
    error
  };
};

// Helper function to get a single artist by ID
export const getArtistById = (artists: ArtistWithSongs[], id: number): ArtistWithSongs | undefined => {
  return artists.find(artist => artist.artist_id === id);
};

// Helper function to get artists by partial name match
export const searchArtists = (artists: ArtistWithSongs[], query: string): ArtistWithSongs[] => {
  const lowercaseQuery = query.toLowerCase();
  return artists.filter(artist => artist.name.toLowerCase().includes(lowercaseQuery));
};