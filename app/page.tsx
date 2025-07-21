import { useMemo, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load FontShowcase since it's not critical for initial page load
const FontShowcase = lazy(() => import("./components/FontShowcase"));

// Lazy load Gallery since it contains many images and is not critical for initial page load
const Gallery = lazy(() => import("./components/Gallery"));

export default function Home() {
  const features = useMemo(() => [
    {
      title: "AI-Powered Generation",
      description:
        "Create unique illustrations and logos in seconds using advanced AI technology",
    },
    {
      title: "Professional Quality",
      description:
        "Get high-resolution, print-ready artwork suitable for any project",
    },
    {
      title: "Easy to Use",
      description:
        "Simple text prompts transform into beautiful artwork with just a few clicks",
    },
  ], []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features features={features} />
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading fonts..." />}>
        <FontShowcase />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading gallery..." />}>
        <Gallery />
      </Suspense>
    </div>
  );
}
