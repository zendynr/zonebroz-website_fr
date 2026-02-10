import { useEffect, useRef, useState } from "react";
import { Slide } from "../types";
import { usePrint } from "../context/PrintContext";
import HeroSlide from "./slides/HeroSlide";
import ScoreBreakdownSlide from "./slides/ScoreBreakdownSlide";
import InsightSlide from "./slides/InsightSlide";
import EvidenceSlide from "./slides/EvidenceSlide";
import DeepDiveSlide from "./slides/DeepDiveSlide";
import UrgentFixesSlide from "./slides/UrgentFixesSlide";
import RoadmapSlide from "./slides/RoadmapSlide";
import FinalVerdictSlide from "./slides/FinalVerdictSlide";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideContainerProps {
  slides: Slide[];
}

export default function SlideContainer({ slides }: SlideContainerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isPrintMode, prefersReducedMotion } = usePrint();

  const visibleSlides = slides.filter((s) => s.visible);

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    // Scroll to current slide
    const currentSlide = slideRefs.current[currentSlideIndex];
    if (currentSlide && containerRef.current) {
      currentSlide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentSlideIndex, isPrintMode, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPrintMode) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setCurrentSlideIndex((prev) =>
        Math.min(prev + 1, visibleSlides.length - 1)
      );
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const renderSlide = (slide: Slide, index: number) => {
    switch (slide.type) {
      case "hero":
        return <HeroSlide data={slide.data as any} slideIndex={index} />;
      case "scoreBreakdown":
        return <ScoreBreakdownSlide data={slide.data as any} slideIndex={index} />;
      case "insight":
        return <InsightSlide data={slide.data as any} slideIndex={index} />;
      case "evidence":
        return <EvidenceSlide data={slide.data as any} slideIndex={index} />;
      case "deepDive":
        return <DeepDiveSlide data={slide.data as any} slideIndex={index} />;
      case "urgentFixes":
        return <UrgentFixesSlide data={slide.data as any} slideIndex={index} />;
      case "roadmap":
        return <RoadmapSlide data={slide.data as any} slideIndex={index} />;
      case "finalVerdict":
        return <FinalVerdictSlide data={slide.data as any} slideIndex={index} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="slide-container"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        height: isPrintMode ? "auto" : "100vh",
        overflow: isPrintMode ? "visible" : "hidden",
        scrollSnapType: isPrintMode ? "none" : "y mandatory",
        position: "relative",
      }}
    >
      {visibleSlides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slideRefs.current[index] = el)}
          className="slide"
          style={{
            height: isPrintMode ? "auto" : "100vh",
            scrollSnapAlign: isPrintMode ? "none" : "start",
            minHeight: isPrintMode ? "auto" : "100vh",
            padding: isPrintMode ? "2rem 0" : "0",
          }}
        >
          {renderSlide(slide, index)}
        </div>
      ))}

      {!isPrintMode && (
        <>
          {/* Navigation buttons */}
          <button
            className="slide-nav-button slide-nav-prev"
            onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            aria-label="Previous slide"
            style={{
              position: "fixed",
              left: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1000,
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #ddd",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer",
              opacity: currentSlideIndex === 0 ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="slide-nav-button slide-nav-next"
            onClick={() =>
              setCurrentSlideIndex((prev) =>
                Math.min(prev + 1, visibleSlides.length - 1)
              )
            }
            disabled={currentSlideIndex === visibleSlides.length - 1}
            aria-label="Next slide"
            style={{
              position: "fixed",
              right: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1000,
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #ddd",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:
                currentSlideIndex === visibleSlides.length - 1
                  ? "not-allowed"
                  : "pointer",
              opacity: currentSlideIndex === visibleSlides.length - 1 ? 0.5 : 1,
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide indicators */}
          <div
            className="slide-indicators"
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {visibleSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: currentSlideIndex === index ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "0.25rem",
                  background:
                    currentSlideIndex === index ? "#3b82f6" : "rgba(0,0,0,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
