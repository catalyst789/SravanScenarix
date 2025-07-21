import Image from "next/image";
import { memo } from "react";

interface GeneratedImageProps {
  imageUrl: string;
}

const GeneratedImage = memo(function GeneratedImage({ imageUrl }: GeneratedImageProps) {
  return (
    <div className="mt-8">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt="Generated artwork"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      </div>
    </div>
  );
});

export default GeneratedImage;
