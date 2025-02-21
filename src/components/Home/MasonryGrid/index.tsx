import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import LazyImageComponent from "./Image";
import getColumnPositions from "@utils/getColumnPositions";
import { MasonryGridProps } from "@/types/photos";
import useStyles from "../styles";

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columnCount = 4,
  gap = 10,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState(0);

  const updateColumnWidth = useCallback(() => {
    if (!containerRef.current) return;

    const totalWidth = containerRef.current.offsetWidth;
    const newColumnWidth = (totalWidth - gap * (columnCount - 1)) / columnCount;
    setColumnWidth(Math.max(0, newColumnWidth));
  }, [columnCount, gap]);

  useEffect(() => {
    updateColumnWidth();
    window.scrollTo(0, 0);

    const resizeObserver = new ResizeObserver(updateColumnWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [updateColumnWidth]);

  const positions = useMemo(
    () => getColumnPositions(items, columnWidth, columnCount, gap),
    [items, columnWidth, columnCount, gap]
  );

  const maxHeight = useMemo(
    () =>
      Object.values(positions).reduce(
        (max, pos) => Math.max(max, pos.top + pos.height),
        0
      ),
    [positions]
  );

  const classes = useStyles({ maxHeight });

  return (
    <div ref={containerRef} className={classes.masonry}>
      {items.map((photo, index) => (
        <LazyImageComponent
          key={`${photo.id}-${index}`}
          photo={photo}
          columnWidth={columnWidth}
          style={{
            position: "absolute",
            top: positions[photo.id]?.top || 0,
            left: positions[photo.id]?.left || 0,
          }}
        />
      ))}
    </div>
  );
};

export default MasonryGrid;
