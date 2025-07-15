
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-3 p-4">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`
                flex-shrink-0 px-6 py-2 rounded-full transition-all duration-300
                ${selectedCategory === category.value 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
                }
              `}
              onClick={() => onCategorySelect(category.value)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
