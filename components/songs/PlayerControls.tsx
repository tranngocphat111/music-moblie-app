import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlayerControlsProps {
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  onSeekStart: () => void;
  onSeekComplete: (value: number) => void;
  onPlayPausePress: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function PlayerControls({
  isPlaying,
  positionMillis,
  durationMillis,
  onSeekStart,
  onSeekComplete,
  onPlayPausePress,
  onNext,
  onPrevious,
}: PlayerControlsProps) {
  return (
    <View style={styles.controlsWrapper}>
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>

        <Slider
          style={styles.slider}
          value={positionMillis}
          minimumValue={0}
          maximumValue={durationMillis}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#555"
          thumbTintColor="#1DB954"
          onSlidingStart={onSeekStart}
          onSlidingComplete={onSeekComplete}
        />

        <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="shuffle" size={24} color="#b3b3b3" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPrevious} style={styles.iconButton}>
          <Ionicons name="play-skip-back" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPausePress} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={36}
            color="#000"
            style={{ marginLeft: isPlaying ? 0 : 4 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.iconButton}>
          <Ionicons name="play-skip-forward" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="repeat" size={24} color="#b3b3b3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsWrapper: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 13,
    color: "#b3b3b3",
    width: 45,
    textAlign: "center",
    fontWeight: "500",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#1DB954",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
