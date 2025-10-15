import { useEffect, useState } from "react";
import { enable, disable, isEnabled } from "darkreader";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(isEnabled());

  useEffect(() => {
    if (dark) enable({ brightness: 100, contrast: 100, sepia: 0 });
    else disable();
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark(!dark)}
      className="relative overflow-hidden rounded-full transition-all duration-300 hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          dark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          dark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/5 to-primary/10 opacity-0 transition-opacity dark:from-primary/10 dark:to-primary/20 dark:opacity-100"></span>
    </Button>
  );
}
