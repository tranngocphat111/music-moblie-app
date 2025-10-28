import type { Song } from "@/types";
import type { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
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
  positionMillis: number;
  durationMillis: number;
  currentLyricIndex: number;
  isSeeking: boolean;
  playSong: (song: Song, index: number, playlist?: Song[]) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
  stopPlayback: () => Promise<void>;
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
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [isSeeking, setIsSeeking] = useState(false);
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

  // Update position and calculate lyric index
  useEffect(() => {
    if (!soundRef.current || !isPlaying) return;

    const updateInterval = setInterval(async () => {
      try {
        const status = await soundRef.current?.getStatusAsync();
        if (!status || !status.isLoaded) return;

        const position = status.positionMillis;
        const duration = status.durationMillis || 0;

        setPositionMillis(position);
        setDurationMillis(duration);

        // Update lyric index
        if (currentSong?.lyric) {
          const newIndex = currentSong.lyric.findIndex((lyric, i) => {
            const nextLyric = currentSong.lyric[i + 1];
            const time = position / 1000; // Convert to seconds
            return lyric.time <= time && (!nextLyric || nextLyric.time > time);
          });
          if (newIndex !== -1) {
            setCurrentLyricIndex(newIndex);
          }
        }
      } catch (error) {
        console.error("Error updating position:", error);
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [isPlaying, currentSong]);

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

      // If same song is playing, just update the metadata
      if (currentSong?.song_id === song.song_id && isPlaying) {
        setCurrentSong(song);
        setCurrentIndex(index);
        if (playlistParam) setPlaylist(playlistParam);
        return;
      }

      // Stop and unload previous song
      await stopPlayback();

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.audio_url },
        { shouldPlay: true, progressUpdateIntervalMillis: 100 }
      );

      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (!status.isLoaded) return;

        const playbackStatus = status as AVPlaybackStatusSuccess;
        if (!status.isLoaded) return;

        if (playbackStatus.didJustFinish) {
          playNext();
          return;
        }

        if (!isSeeking) {
          setPositionMillis(playbackStatus.positionMillis);
          setDurationMillis(playbackStatus.durationMillis ?? 0);
          setIsPlaying(playbackStatus.isPlaying);

          // Update lyrics if available
          if (song.lyric) {
            const timeInSeconds = playbackStatus.positionMillis / 1000;
            const newIndex = song.lyric.findIndex((lyric, i) => {
              const nextLyric = song.lyric[i + 1];
              return (
                lyric.time <= timeInSeconds &&
                (!nextLyric || nextLyric.time > timeInSeconds)
              );
            });
            if (newIndex !== -1 && newIndex !== currentLyricIndex) {
              setCurrentLyricIndex(newIndex);
            }
          }
        }
      });

      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
      setPositionMillis(0);
      setCurrentLyricIndex(-1);
      if (playlistParam) setPlaylist(playlistParam);
    } catch (err) {
      console.error("playSong error", err);
      await stopPlayback();
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

  const stopPlayback = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setPositionMillis(0);
        setIsPlaying(false);
        setCurrentLyricIndex(-1);
      } catch (error) {
        console.error("Error stopping playback:", error);
      }
    }
  };

  const seekTo = async (millis: number) => {
    if (!soundRef.current) return;
    try {
      setIsSeeking(true);
      await soundRef.current.setPositionAsync(millis);
      setPositionMillis(millis);
      setIsSeeking(false);
    } catch (error) {
      console.error("Error seeking:", error);
      setIsSeeking(false);
    }
  };

  const value: AudioContextType = {
    currentSong,
    currentIndex,
    isPlaying,
    playlist,
    positionMillis,
    durationMillis,
    currentLyricIndex,
    isSeeking,
    playSong,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    stopPlayback,
    sound: soundRef.current,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioContext;
