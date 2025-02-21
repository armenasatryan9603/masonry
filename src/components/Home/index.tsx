import { lazy, Suspense, useEffect, useRef, useState } from "react";

import WorkerConstructor from "@worker";
import type { Photo, Photos } from "@/types/photos";
import useDebounced from "@hooks/useDebounced";
import useStyles from "./styles";

const LazyMasonryGrid = lazy(() => import("@components/Home/MasonryGrid"));
const LazyHeader = lazy(() => import("@components/Home/Header"));

const worker = new WorkerConstructor();
const defaultCategory = "cat";

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(defaultCategory);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useDebounced(query, 1000);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (!debouncedSearch.length) {
      return;
    }
    // Reset when the search query changes
    setPhotos([]);
    setPage(1);
    setHasMore(true);

    // Fetch new data for debouncedSearch (page = 1)
    worker.postMessage({ query: debouncedSearch || defaultCategory, page: 1 });
  }, [debouncedSearch, setPhotos, setHasMore, setPage]);

  useEffect(() => {
    // Worker event listener should be set once
    worker.onmessage = (event: MessageEvent<Photos<Photo>>) => {
      const { photos, next_page } = event.data;

      setPhotos((prev) => [...prev, ...photos]);
      setHasMore(!!next_page);
      setPage((prevPage) => prevPage + 1);
    };

    return () => {
      worker.onmessage = null; // Clean up on unmount
    };
  }, [setPhotos, setHasMore, setPage]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Ensure previous observer is disconnected before creating a new one
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        worker.postMessage({ query: debouncedSearch || defaultCategory, page });
      }
    });

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [debouncedSearch, page, hasMore, worker]);

  return (
    <>
      <LazyHeader query={query} setQuery={setQuery} />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMasonryGrid items={photos} />
      </Suspense>

      {hasMore ? (
        <div ref={elementRef} />
      ) : (
        <div className={classes.message}>No more ...</div>
      )}
    </>
  );
};

export default Home;
