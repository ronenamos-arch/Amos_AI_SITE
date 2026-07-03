'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/lib/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const testimonial = testimonials[current];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex flex-col justify-center space-y-6">
        {/* Testimonial Text */}
        <p className="text-lg leading-relaxed text-white italic">
          "{testimonial.text}"
        </p>

        {/* Author Info */}
        <div className="space-y-1">
          <p className="font-bold text-text-primary">
            {testimonial.name}
            {testimonial.placeholder && (
              <span className="text-sm text-teal-400 mr-2">*</span>
            )}
          </p>
          {!testimonial.placeholder && (
            <p className="text-sm text-text-secondary">
              {testimonial.title && `${testimonial.title} `}
              {testimonial.company && `at ${testimonial.company}`}
            </p>
          )}
          {testimonial.placeholder && (
            <p className="text-xs text-text-muted italic">
              להוספת המלצה אחרת, צור קשר עם רונן
            </p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
        <button
          onClick={goToPrevious}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronRight className="w-5 h-5 text-teal-400" />
        </button>

        {/* Dots */}
        <div className="flex gap-2 flex-grow justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setIsAutoPlay(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? 'bg-teal-400 w-6' : 'bg-white/20'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-teal-400" />
        </button>
      </div>
    </div>
  );
}
