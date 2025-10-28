// File: types/index.ts

// Kiểu dữ liệu cho một Album (Dữ liệu giả)
export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export type LyricLine = {
  time: number;
  text: string;
};


// Kiểu dữ liệu cho Artist (từ API)
export interface ApiArtistInfo {
  artist_id: number;
  name: string;
}

// Kiểu dữ liệu cho Album (từ API)
export interface ApiAlbumInfo {
  album_id: number;
  title: string;
  release_date: string;
}

// Kiểu dữ liệu cho Song (từ API)
export interface Song {
  _id: string;
  song_id: number;
  title: string;
  duration: number;
  image_url: string;
  audio_url: string;
  artist: ApiArtistInfo;
  album: ApiAlbumInfo;
  lyric: LyricLine[];
}

// Kiểu dữ liệu cho Props
export interface SectionHeaderProps {
  title: string;
}


export interface RecentlyMusicProps {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}
