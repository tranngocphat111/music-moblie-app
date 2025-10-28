import { SearchResult, TabType } from "@/types/search";

/**
 * Filter and process search results
 */
export const filterSearchResults = (
  searchQuery: string,
  activeTab: TabType,
  songs: any[],
  artists: any[],
  albums: any[]
): SearchResult[] => {
  if (!searchQuery) return [];

  const results: SearchResult[] = [];
  const query = searchQuery.toLowerCase();

  const addIfMatches = (item: any, type: TabType) => {
    // Skip if item doesn't have required ID field
    if (!item) return;
    if (type === "song" && !item.song_id) return;
    if (type === "artist" && !item.artist_id) return;
    if (type === "album" && (!item.album_id && !item.id)) return;

    let matchesQuery = false;

    if (type === "song") {
      matchesQuery = 
        item.title?.toLowerCase().includes(query) ||
        item.artist?.name?.toLowerCase().includes(query);
    } else if (type === "artist") {
      matchesQuery = item.name?.toLowerCase().includes(query);
    } else if (type === "album") {
      // Album có thể từ 2 nguồn:
      // 1. Raw albums từ data.js: { album_id, title, artist_id }
      // 2. Processed albums từ useFetchAlbums: { id, title, artist, image }
      const isProcessedAlbum = !!item.artist && typeof item.artist === 'string';
      
      if (isProcessedAlbum) {
        // Album đã được xử lý
        matchesQuery = 
          item.title?.toLowerCase().includes(query) ||
          item.artist?.toLowerCase().includes(query);
      } else {
        // Album raw từ data.js
        const albumArtist = artists?.find(a => a.artist_id === item.artist_id);
        matchesQuery = 
          item.title?.toLowerCase().includes(query) ||
          albumArtist?.name?.toLowerCase().includes(query);
      }
    }

    const matchesTab = activeTab === "all" || activeTab === type;

    if (matchesQuery && matchesTab) {
      let artistName = "";
      let imageUrl = "";

      if (type === "song") {
        artistName = item.artist?.name || "";
        imageUrl = item.image_url || "";
      } else if (type === "artist") {
        artistName = `${item.songs?.length || 0} songs`;
        imageUrl = item.image_url || item.songs?.[0]?.image_url || "";
      } else if (type === "album") {
        // Xử lý album
        const isProcessedAlbum = !!item.artist && typeof item.artist === 'string';
        
        if (isProcessedAlbum) {
          artistName = item.artist;
          imageUrl = item.image || "";
        } else {
          // Album raw từ data.js
          const albumArtist = artists?.find(a => a.artist_id === item.artist_id);
          artistName = albumArtist?.name || "";
          const albumSong = songs?.find(s => s.album?.album_id === item.album_id);
          imageUrl = albumSong?.image_url || "";
        }
      }

      results.push({
        id: type === "song" ? item.song_id.toString() :
            type === "artist" ? item.artist_id.toString() :
            (item.album_id || item.id).toString(),
        title: type === "artist" ? item.name : item.title,
        artist: artistName,
        image: imageUrl,
        type,
        data: item
      });
    }
  };

  if (songs && Array.isArray(songs)) {
    songs.forEach(song => addIfMatches(song, "song"));
  }
  if (artists && Array.isArray(artists)) {
    artists.forEach(artist => addIfMatches(artist, "artist"));
  }
  if (albums && Array.isArray(albums)) {
    albums.forEach(album => addIfMatches(album, "album"));
  }

  return results.sort((a, b) => {
    const aExactMatch = a.title.toLowerCase() === query;
    const bExactMatch = b.title.toLowerCase() === query;
    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;
    return 0;
  });
};

/**
 * Navigate based on search result type
 */
export const navigateToResult = (result: SearchResult, router: any) => {
  try {
    switch (result.type) {
      case "song":
        router.push({
          pathname: "/songs/SongScreen" as any,
          params: { id: result.id }
        });
        break;
      case "artist":
        console.log('Navigate to artist:', result.id);
        // TODO: Implement artist navigation when route is available
        break;
      case "album":
        console.log('Navigate to album:', result.id);
        // TODO: Implement album navigation when route is available
        break;
    }
  } catch (error) {
    console.error('Navigation error:', error);
  }
};
