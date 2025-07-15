
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ImageGrid } from "@/components/ImageGrid";
import { CategorySlider } from "@/components/CategorySlider";
import { Pagination } from "@/components/Pagination";
import { ImageModal } from "@/components/ImageModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = "51329157-16a7d6c093b9d3ce7267bf729";
const API_URL = "https://pixabay.com/api/";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              PixelScape
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover stunning images from around the world
            </p>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={setIsDarkMode} />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Slider */}
        <div className="mb-8">
          <CategorySlider onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        </div>

        {/* Results Info */}
        {data && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Found {data.totalHits.toLocaleString()} images
            </p>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value={12}>12 per page</option>
              <option value={20}>20 per page</option>
              <option value={40}>40 per page</option>
            </select>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading images...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">Error loading images. Please try again.</p>
          </div>
        )}

        {/* Image Grid */}
        {data && data.hits.length > 0 && (
          <ImageGrid images={data.hits} onImageClick={setSelectedImage} />
        )}

        {/* No Results */}
        {data && data.hits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No images found. Try a different search term.
            </p>
          </div>
        )}

        {/* Pagination */}
        {data && data.hits.length > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(totalPages, 50)} // Pixabay API limit
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
      </div>
    </div>
  );
};

export default Index;
