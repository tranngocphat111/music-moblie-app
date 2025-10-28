import { useFetchSongs } from "@/hooks/useFetchSongs";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { PlayerModal } from "@/components/songs/PlayerModal";
import { SongList } from "@/components/songs/SongList";

type Song = any;

export default function SongScreen() {
  const { songs } = useFetchSongs();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });
      } catch (e) {
        console.error("Lỗi cài đặt audio mode:", e);
      }
    };
    setupAudioMode();
  }, []);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const playSong = async (song: Song) => {
    if (selectedSong?.song_id === song.song_id && isPlaying) {
      setSelectedSong(song);
      return;
    }
    await stopSong();
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.audio_url },
        { shouldPlay: true, progressUpdateIntervalMillis: 100 }
      );
      setSound(newSound);
      setSelectedSong(song);
      setIsPlaying(true);
      setPositionMillis(0);
      setCurrentLyricIndex(-1);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          stopSong();
          return;
        }
        if (!isSeeking) setPositionMillis(status.positionMillis);
        setDurationMillis(status.durationMillis || 0);
        setIsPlaying(status.isPlaying);

        const currentTime = status.positionMillis / 1000;
        let newIndex = -1;

        if (song.lyric) {
          for (let i = 0; i < song.lyric.length; i++) {
            if (currentTime >= song.lyric[i].time) newIndex = i;
            else break;
          }
        }

        if (newIndex !== currentLyricIndex) {
          setCurrentLyricIndex(newIndex);
        }
      });
    } catch (error) {
      console.error("Lỗi phát nhạc:", error);
      await stopSong();
    }
  };

  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    setSound(null);
    setPositionMillis(0);
    setIsPlaying(false);
    setCurrentLyricIndex(-1);
  };

  const closeModal = () => {
    stopSong();
    setSelectedSong(null);
    setDurationMillis(0);
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const onSeekStart = () => setIsSeeking(true);
  const onSeekComplete = async (value: number) => {
    if (sound) await sound.setPositionAsync(value);
    setPositionMillis(value);
    setIsSeeking(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Danh sách bài hát</Text>

      <SongList
        songs={songs || []}
        selectedSong={selectedSong}
        isPlaying={isPlaying}
        onSongPress={playSong}
      />

      {selectedSong && (
        <PlayerModal
          selectedSong={selectedSong}
          isPlaying={isPlaying}
          positionMillis={positionMillis}
          durationMillis={durationMillis}
          currentLyricIndex={currentLyricIndex}
          onClose={closeModal}
          onSeekStart={onSeekStart}
          onSeekComplete={onSeekComplete}
          onPlayPausePress={togglePlayPause}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50, 
    backgroundColor: "#0c0c0f" 
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
    color: "#fff",
  },
});