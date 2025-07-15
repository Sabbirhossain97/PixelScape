
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface CategorySliderProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  { name: "All", value: "" },
  { name: "Nature", value: "nature" },
  { name: "Animals", value: "animals" },
  { name: "Food", value: "food" },
  { name: "Travel", value: "travel" },
  { name: "Architecture", value: "architecture" },
  { name: "Technology", value: "technology" },
  { name: "Sports", value: "sports" },
  { name: "Business", value: "business" },
  { name: "Fashion", value: "fashion" },
  { name: "Music", value: "music" },
  { name: "Health", value: "health" },
  { name: "Education", value: "education" },
];

export const CategorySlider = ({ onCategorySelect, selectedCategory }: CategorySliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full group">
      {/* Left Navigation Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Right Navigation Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:scale-110 shadow-lg"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/20 shadow-xl">
        <div 
          ref={scrollRef}
          className="flex space-x-3 p-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`
                flex-shrink-0 px-8 py-3 rounded-full transition-all duration-500 font-medium text-sm
                transform hover:scale-105 hover:-translate-y-1
                ${selectedCategory === category.value 
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl border-0 animate-pulse-glow' 
                  : 'bg-background/60 backdrop-blur-sm hover:bg-accent/80 border-border/50 text-foreground hover:shadow-lg hover:border-accent'
                }
                ${index === 0 ? 'animate-float' : ''}
              `}
              onClick={() => onCategorySelect(category.value)}
            >
              <span className="relative z-10">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
