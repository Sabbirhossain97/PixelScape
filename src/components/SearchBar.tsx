
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-full shadow-lg hover:shadow-3xl transition-all duration-500 hover:border-accent/50">
          <Input
            type="text"
            placeholder="Search for beautiful images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-28 sm:pr-32 py-6 text-lg bg-transparent border-0 rounded-full focus:ring-0 focus:outline-none placeholder:text-muted-foreground/70 font-medium"
          />

          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <Search className="text-muted-foreground w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
          </div>

          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};
