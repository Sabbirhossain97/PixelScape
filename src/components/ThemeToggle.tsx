
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: (isDark: boolean) => void;
}

export const ThemeToggle = ({ isDarkMode, onToggle }: ThemeToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(!isDarkMode)}
      className="rounded-full p-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </Button>
  );
};
