"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/LoadingSpinner";

// Dynamic import for Pexels client to reduce bundle size
const PexelsGallery = dynamic(() => import("../components/PexelsGallery"), {
  loading: () => <GallerySkeleton />,
  ssr: false,
});

interface Photo {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  photographer: string;
  photographerUrl: string;
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="relative aspect-square bg-gray-200 dark:bg-gray-700" />
          <div className="p-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Explore our collection of AI-generated artwork
        </p>

        <Suspense fallback={<LoadingSpinner size="lg" text="Loading gallery..." />}>
          <PexelsGallery />
        </Suspense>
      </div>
    </div>
  );
}
