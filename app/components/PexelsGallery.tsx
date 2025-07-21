"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "pexels";
import LoadingSpinner from "./LoadingSpinner";

interface Photo {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  photographer: string;
  photographerUrl: string;
}

export default function PexelsGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const client = createClient(
          process.env.NEXT_PUBLIC_PEXELS_API_KEY || ""
        );
        const response = await client.photos.search({
          query: "ai generated art",
          per_page: 80,
        });

        if ("error" in response) {
          throw new Error(response.error);
        }

        const formattedPhotos = response.photos.map((photo) => ({
          id: photo.id,
          title: photo.alt || "Untitled",
          description: photo.alt || "No description available",
          image: photo.src.large2x,
          tags: ["Abstract", "Digital", "Art"],
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
        }));

        setPhotos(formattedPhotos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="Loading gallery..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
        >
          <div className="relative aspect-square">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={85}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {photo.description}
            </p>
            <p className="text-sm text-gray-500">
              Photo by{" "}
              <a
                href={photo.photographerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                {photo.photographer}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 