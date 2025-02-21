import { StrictMode, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";

import ErrorBoundary from "@components/ErrorBoundary";

// Lazy loading components
const LazyHome = lazy(() => import("@components/Home"));
const LazyDetailedView = lazy(() => import("@components/Details"));

// Fallback Loader Component
const Loader = () => (
  <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
    Loading...
  </div>
);

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <LazyHome />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path="image">
          <Route
            path=":id"
            element={
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <LazyDetailedView />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// Mount the App
createRoot(document.getElementById("root")!).render(<App />);
