
import { X, Download, Heart, Eye, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

interface ImageModalProps {
  image: PixabayImage;
  onClose: () => void;
}

export const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(image.largeImageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixelscape-${image.tags.split(',')[0]}-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const tags = image.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">{image.user}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <img
              src={image.largeImageURL}
              alt={image.tags}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* Stats */}
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                <span className="font-medium">{image.likes.toLocaleString()}</span>
                <span className="ml-1 text-sm">likes</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-medium">{image.views.toLocaleString()}</span>
                <span className="ml-1 text-sm">views</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Download className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-medium">{image.downloads.toLocaleString()}</span>
                <span className="ml-1 text-sm">downloads</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Tag className="w-4 h-4 mr-2" />
                <span className="font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
