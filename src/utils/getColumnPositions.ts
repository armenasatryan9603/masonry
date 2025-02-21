import { Geometry, Photo } from "@/types/photos";

const getColumnPositions = (
  photos: Photo[],
  colWidth: number,
  columnCount: number,
  gap: number
) => {
  const positions: {
    [key: string]: Geometry;
  } = {};
  const columnHeights = Array(columnCount).fill(0);

  photos.forEach((photo) => {
    const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
    const height = (photo.height * colWidth) / photo.width;

    if (!positions[photo.id]) {
      positions[photo.id] = {
        top: columnHeights[shortestCol],
        left: shortestCol * (colWidth + gap),
        height,
        width: colWidth,
      };

      columnHeights[shortestCol] += height + gap;
    }
  });

  return positions;
};

export default getColumnPositions;
