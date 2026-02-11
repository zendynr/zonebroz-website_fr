import { useEffect, useRef, useState } from "react";
import { Slide } from "../types";
import { usePrint } from "../context/PrintContext";
import HeroSlide from "./slides/HeroSlide";
import ScoreBreakdownSlide from "./slides/ScoreBreakdownSlide";
import InsightSlide from "./slides/InsightSlide";
import EvidenceSlide from "./slides/EvidenceSlide";
import DeepDiveSlide from "./slides/DeepDiveSlide";
import UrgentFixesSlide from "./slides/UrgentFixesSlide";
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
      case "finalVerdict":
        return <FinalVerdictSlide data={slide.data as any} slideIndex={index} />;
      default:
        return null;
    }
  };

  /* Shared nav button style */
  const navButtonBase: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1000,
    background: "var(--surface-overlay)",
    backdropFilter: "blur(8px)",
    border: "1px solid var(--border-default)",
    borderRadius: "50%",
    width: "2.75rem",
    height: "2.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-md)",
    color: "var(--text-secondary)",
    transition: "all var(--duration-normal) var(--ease-out)",
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
          {/* Previous button */}
          <button
            className="slide-nav-button slide-nav-prev"
            onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            aria-label="Previous slide"
            style={{
              ...navButtonBase,
              left: "1.25rem",
              cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer",
              opacity: currentSlideIndex === 0 ? 0.35 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentSlideIndex !== 0) {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.background = "var(--surface-raised)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.background = "var(--surface-overlay)";
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next button */}
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
              ...navButtonBase,
              right: "1.25rem",
              cursor:
                currentSlideIndex === visibleSlides.length - 1
                  ? "not-allowed"
                  : "pointer",
              opacity: currentSlideIndex === visibleSlides.length - 1 ? 0.35 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentSlideIndex !== visibleSlides.length - 1) {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.background = "var(--surface-raised)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.background = "var(--surface-overlay)";
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide indicators */}
          <div
            className="slide-indicators"
            style={{
              position: "fixed",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              display: "flex",
              gap: "0.375rem",
              padding: "0.375rem 0.625rem",
              background: "var(--surface-overlay)",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {visibleSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: currentSlideIndex === index ? "1.5rem" : "0.375rem",
                  height: "0.375rem",
                  borderRadius: "var(--radius-full)",
                  background:
                    currentSlideIndex === index ? "var(--accent-primary)" : "rgba(0,0,0,0.18)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s var(--ease-out)",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
