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
          minimumTrackTintColor="#9DFE00"
          maximumTrackTintColor="#555"
          thumbTintColor="#9DFE00"
          onSlidingStart={onSeekStart}
          onSlidingComplete={onSeekComplete}
        />

        <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="shuffle" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPrevious}>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPausePress} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#fff"
            style={{ marginLeft: isPlaying ? 0 : 3 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="repeat" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsWrapper: {
    width: "100%",
    backgroundColor: "#0c0c0f",
    paddingTop: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#ccc",
    width: 40,
    textAlign: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
