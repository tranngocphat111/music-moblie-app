/**
 * Defines the possible types of search results
 * @remarks This type is used to distinguish between different content types in search results
 */
export type SearchResultType = "song" | "artist" | "album" | "mv";

/**
 * Represents a search result item in the application
 * @interface
 */
export interface SearchResult {
  /** Unique identifier for the search result */
  id: string;
  /** Title or name of the search result item */
  title: string;
  /** Artist name associated with the result */
  artist: string;
  /** URL or path to the image representing the result */
  image: string;
  /** Type of the search result */
  type: SearchResultType;
}