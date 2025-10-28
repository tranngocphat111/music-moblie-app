import type { Song } from "@/types";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AudioContextType = {
  currentSong: Song | null;
  currentIndex: number | null;
  isPlaying: boolean;
  playlist: Song[];
  playSong: (song: Song, index: number, playlist?: Song[]) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  sound: Audio.Sound | null;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      // cleanup sound on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const ensureAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (e) {
      console.warn("Failed to set audio mode", e);
    }
  };

  const playSong = async (song: Song, index = 0, playlistParam?: Song[]) => {
    try {
      await ensureAudioMode();

      // unload previous
      if (soundRef.current) {
        try {
          await soundRef.current.unloadAsync();
        } catch {}
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.audio_url },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
      if (playlistParam) setPlaylist(playlistParam);
    } catch (err) {
      console.error("playSong error", err);
    }
  };

  const togglePlayPause = async () => {
    try {
      const snd = soundRef.current;
      if (!snd) return;
      const status = await snd.getStatusAsync();
      if ((status as any).isLoaded) {
        if ((status as any).isPlaying) {
          await snd.pauseAsync();
          setIsPlaying(false);
        } else {
          await snd.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error("togglePlayPause error", err);
    }
  };

  const playNext = async () => {
    if (currentIndex == null) return;
    const next = currentIndex + 1;
    if (next >= playlist.length) return;
    const song = playlist[next];
    await playSong(song, next, playlist);
  };

  const playPrevious = async () => {
    if (currentIndex == null) return;
    const prev = currentIndex - 1;
    if (prev < 0) return;
    const song = playlist[prev];
    await playSong(song, prev, playlist);
  };

  const value: AudioContextType = {
    currentSong,
    currentIndex,
    isPlaying,
    playlist,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    sound: soundRef.current,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioContext;
