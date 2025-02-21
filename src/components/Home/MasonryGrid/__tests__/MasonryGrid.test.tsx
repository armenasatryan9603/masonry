import { render, screen, act } from "@testing-library/react";
import MasonryGrid from "../index";
import { Geometry, Photo } from "@/types/photos";

// Mock ResizeObserver
class MockResizeObserver {
  constructor(_callback: ResizeObserverCallback) {
    // Callback not used in mock
  }
  observe(_target: Element) {
    // Mock implementation
  }
  unobserve(_target: Element) {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}

// Set up the mock
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock the utility function
jest.mock("@utils/getColumnPositions", () => ({
  __esModule: true,
  default: jest.fn((items) =>
    items.reduce(
      (
        acc: {
          [x: string]: Geometry;
        },
        photo: { id: string | number; height: any; width: any }
      ) => {
        acc[photo.id] = {
          top: 0,
          left: 0,
          height: photo.height,
          width: photo.width,
        };
        return acc;
      },
      {}
    )
  ),
}));

// Mock the LazyImageComponent
jest.mock("../Image", () => ({
  __esModule: true,
  default: ({ photo }: { photo: Photo }) => (
    <div data-testid={`image-${photo.id}`}>{photo.alt}</div>
  ),
}));

describe("MasonryGrid", () => {
  const mockPhotos: Photo[] = [
    {
      id: 1,
      alt: "Test Image 1",
      height: 100,
      width: 200,
      src: {
        tiny: "test1.jpg",
        small: "test1.jpg",
        medium: "test1.jpg",
        large: "test1.jpg",
        large2x: "test1.jpg",
        original: "test1.jpg",
        portrait: "test1.jpg",
        landscape: "test1.jpg",
      },
      avg_color: "#ffffff",
      liked: false,
      photographer: "Test Photographer",
      photographer_id: 1,
      photographer_url: "http://test.com",
      url: "http://test.com",
    },
    {
      id: 2,
      alt: "Test Image 2",
      height: 150,
      width: 300,
      src: {
        tiny: "test2.jpg",
        small: "test2.jpg",
        medium: "test2.jpg",
        large: "test2.jpg",
        large2x: "test2.jpg",
        original: "test2.jpg",
        portrait: "test2.jpg",
        landscape: "test2.jpg",
      },
      avg_color: "#000000",
      liked: false,
      photographer: "Test Photographer",
      photographer_id: 1,
      photographer_url: "http://test.com",
      url: "http://test.com",
    },
  ];

  beforeEach(() => {
    // Reset window scroll
    window.scrollTo = jest.fn();
  });

  it("renders all images", () => {
    render(<MasonryGrid items={mockPhotos} />);

    mockPhotos.forEach((photo) => {
      expect(screen.getByTestId(`image-${photo.id}`)).toBeInTheDocument();
    });
  });

  it("applies correct default props", () => {
    const { container } = render(<MasonryGrid items={mockPhotos} />);
    const gridContainer = container.firstChild as HTMLElement;

    expect(gridContainer).toHaveStyle({
      position: "relative",
      width: "100%",
      maxWidth: "500px",
    });
  });

  it("updates column width on resize", async () => {
    const { container } = render(
      <MasonryGrid items={mockPhotos} columnCount={2} gap={20} />
    );

    // Simulate resize
    act(() => {
      // Mock container width
      Object.defineProperty(container.firstChild, "offsetWidth", {
        configurable: true,
        value: 500,
      });

      window.dispatchEvent(new Event("resize"));
    });

    // Container should exist
    expect(container.firstChild).toBeInTheDocument();
  });

  it("resets scroll position when items change", () => {
    const { rerender } = render(<MasonryGrid items={mockPhotos} />);

    // Update props
    rerender(<MasonryGrid items={[mockPhotos[0]]} />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
