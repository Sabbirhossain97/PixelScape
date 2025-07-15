
import { Download, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  views: number;
  downloads: number;
  likes: number;
  previewURL: string;
}

interface ImageGridProps {
  images: PixabayImage[];
  onImageClick: (image: PixabayImage) => void;
}

export const ImageGrid = ({ images, onImageClick }: ImageGridProps) => {
  const handleDownload = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixelscape-${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
              onClick={() => onImageClick(image)}
              loading="lazy"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full bg-white/90 hover:bg-white text-gray-800 p-2"
                onClick={() => handleDownload(image.largeImageURL, image.tags.split(',')[0])}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {image.likes}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {image.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Info */}
          <div className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              By {image.user}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
              {image.tags.split(',').slice(0, 3).join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
