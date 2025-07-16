import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ImageGrid } from "@/components/ImageGrid";
import { CategorySlider } from "@/components/CategorySlider";
import { Pagination } from "@/components/Pagination";
import { ImageModal } from "@/components/ImageModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { Loader, Image as ImageIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

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

interface PixabayResponse {
  hits: PixabayImage[];
  total: number;
  totalHits: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("nature");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchImages = async (): Promise<PixabayResponse> => {
    const query = selectedCategory || searchQuery;
    const response = await fetch(
      `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=all&category=all&min_width=640&min_height=480&per_page=${perPage}&page=${currentPage}&safesearch=true`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['images', searchQuery, selectedCategory, currentPage, perPage],
    queryFn: fetchImages,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data ? Math.ceil(data.totalHits / perPage) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10 transition-all duration-700">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-12 relative">
          <div className="text-center flex-1 pt-10 sm:pt-0">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg animate-pulse-glow">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                PixelScape
              </h1>
            </div>
            <p className="text-muted-foreground text-xl font-medium tracking-wide">
              Discover stunning images from around the world
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={setIsDarkMode} />
        </div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
          <CategorySlider onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        </div>

        {data && (
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-muted-foreground font-medium">
                Found <span className="text-foreground font-bold">{data.totalHits.toLocaleString()}</span> images
              </p>
            </div>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-border rounded-xl bg-card/80 backdrop-blur-sm text-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            >
              <option value={12}>12 per page</option>
              <option value={20}>20 per page</option>
              <option value={40}>40 per page</option>
            </select>
          </div>
        )}

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative">
              <Loader className="w-12 h-12 animate-spin text-blue-600" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-pulse"></div>
            </div>
            <span className="mt-6 text-muted-foreground text-lg font-medium animate-pulse">
              Loading amazing images...
            </span>
            <div className="flex gap-1 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* Enhanced Error State */}
        {error && (
          <div className="text-center py-32">
            <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-2xl max-w-md mx-auto">
              <p className="text-destructive text-lg font-medium">
                Oops! Something went wrong. Please try again.
              </p>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {data && data.hits.length > 0 && (
          <ImageGrid images={data.hits} onImageClick={setSelectedImage} />
        )}

        {/* Enhanced No Results */}
        {data && data.hits.length === 0 && (
          <div className="text-center py-32">
            <div className="p-8 bg-muted/30 border border-border/50 rounded-2xl max-w-md mx-auto backdrop-blur-sm">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg font-medium">
                No images found. Try a different search term.
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Pagination */}
        {data && data.hits.length > 0 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(totalPages, 50)}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
