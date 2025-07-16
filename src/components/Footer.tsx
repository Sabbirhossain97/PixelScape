
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            Made with 
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            by{" "}
            <a 
              href="https://github.com/Sabbirhossain97" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
            >
              Sabbir Hossain
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
