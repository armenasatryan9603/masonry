type Color = `#${string}`;

type PhotoSrc = {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
};

export type Photo = {
  alt: string;
  avg_color: Color;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: PhotoSrc;
  url: string;
  width: number;
};

export type Photos<T> = {
  page: number;
  per_page: number;
  photos: T[];
  total_results: number;
  next_page: string;
};

export type ImageProps = {
  item: Photo;
};

export type GridProps = {
  items: Photo[];
};

export type MasonryGridProps = {
  items: Photo[];
  columnCount?: number;
  gap?: number;
};

export type Geometry = {
  top: number;
  left: number;
  height: number;
  width: number;
};
