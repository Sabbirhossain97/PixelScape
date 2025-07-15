
import { Download, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      {images.map((image) => {
        const tags = image.tags.split(',').map(tag => tag.trim()).slice(0, 3);
        
        return (
          <div
            key={image.id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-square overflow-hidden relative">
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                onClick={() => onImageClick(image)}
                loading="lazy"
              />
              
              {/* Overlay with stats in center */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="flex items-center justify-center space-x-6 text-white text-sm mb-4">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-400" />
                      {image.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-blue-400" />
                      {image.views}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-5 h-5 mr-2 text-green-400" />
                      {image.downloads}
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white text-gray-800 px-4 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image.largeImageURL, image.tags.split(',')[0]);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
