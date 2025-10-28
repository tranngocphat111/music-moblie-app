import { ResultItemProps } from '@/types/search/props';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


const ResultItem = ({ title, artist, image }: ResultItemProps) => {
  return (
    <TouchableOpacity style={styles.resultItem}>
      <Image source={{ uri: image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{title}</Text>
        <Text style={styles.resultArtist}>{artist}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1f3a",
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  resultArtist: {
    color: "#666",
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ResultItem;