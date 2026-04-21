export interface Item {
  id: number;
  url: string;
  rating: 'safe' | 'suggestive' | 'borderline' | 'explicit';
  color_dominant: number[];
  color_palette: number[][];
  artist_name: string | null;
  tags: string[];
  source_url: string | null;
}

export interface ApiResponse {
  items: Item[];
  count: number;
}

export type RatingFilter = 'all' | 'safe' | 'suggestive' | 'borderline' | 'explicit';
export type SortOption = 'newest' | 'oldest' | 'rating';
export type ViewMode = 'grid' | 'masonry';
