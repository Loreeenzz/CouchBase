"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface PPTHolderProps {
  slides: string[];
}

export default function PPTHolder({ slides }: PPTHolderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSlide();
      } else if (e.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isFullscreen]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = fullscreenRef.current;
    if (!element) return;

    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) =>
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        );
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
      setIsFullscreen(true);
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch((err) =>
            console.error(`Error attempting to exit fullscreen: ${err.message}`)
          );
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div ref={fullscreenRef} className="w-full mx-auto">
      <Card
        className={`${
          isFullscreen
            ? "rounded-none border-0"
            : "shadow-2xl backdrop-blur-sm bg-card/95"
        }`}
      >
        <CardContent
          className={`relative p-0 ${isFullscreen ? "" : "aspect-[16/9]"}`}
        >
          {/* Container for the slide with proper aspect ratio */}
          <div
            className={`
              w-full h-full flex items-center justify-center 
              ${isFullscreen ? "bg-black min-h-screen" : ""}
            `}
          >
            {isFullscreen ? (
              // In fullscreen mode, center the image with proper scaling
              <div className="w-full h-screen flex items-center justify-center p-8">
                <img
                  src={slides[currentSlide] || "/placeholder.svg"}
                  alt={`Slide ${currentSlide + 1}`}
                  className="max-w-[90%] max-h-[90vh] w-auto h-auto object-contain"
                />
              </div>
            ) : (
              // Normal view - just show the image
              <img
                src={slides[currentSlide] || "/placeholder.svg"}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-auto object-contain"
              />
            )}
          </div>

          {/* Fullscreen toggle button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute ${
              isFullscreen ? "top-4 right-4" : "top-2 right-2"
            } bg-black/30 hover:bg-black/50 text-white rounded-full z-10 backdrop-blur-sm`}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-6 w-6" />
            ) : (
              <Maximize className="h-6 w-6" />
            )}
          </Button>

          {/* Navigation arrows - only show in non-fullscreen mode */}
          {!isFullscreen && currentSlide > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10 backdrop-blur-sm transition-all duration-200"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {!isFullscreen && currentSlide < slides.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10 backdrop-blur-sm transition-all duration-200"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Slide counter */}
          <div
            className={`absolute ${
              isFullscreen ? "bottom-8" : "bottom-4"
            } left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-1.5 rounded-full text-sm z-10 backdrop-blur-sm font-medium`}
          >
            {currentSlide + 1} / {slides.length}
          </div>
        </CardContent>
      </Card>

      {/* Slide thumbnails - only show when not in fullscreen */}
      {!isFullscreen && (
        <div className="flex overflow-x-auto gap-3 mt-8 pt-4 pb-2 justify-center px-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                currentSlide === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={slide || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
