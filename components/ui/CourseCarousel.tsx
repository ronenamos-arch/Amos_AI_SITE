'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { Button } from './Button';
import type { Course } from '@/lib/courses';

interface CourseCarouselProps {
  courses: Course[];
}

export function CourseCarousel({ courses }: CourseCarouselProps) {
  const [current, setCurrent] = useState(0);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % courses.length);
  };

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="relative">
          {/* Course Card */}
          <div className="px-4">
            <GlassCard
              key={courses[current].slug}
              className={`flex flex-col h-full border-t-4 ${
                courses[current].color === 'teal' ? 'border-teal-400' : 'border-royal-500'
              } !p-0 overflow-hidden`}
            >
              {/* Syllabus Preview Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
                <img
                  src={courses[current].image}
                  alt={`${courses[current].title} Syllabus`}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant={courses[current].color as any}>
                    {courses[current].duration}
                  </Badge>
                </div>
              </div>

              <div className="p-8 pt-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4">{courses[current].title}</h3>
                <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                  {courses[current].description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <span className="text-xs text-text-muted font-medium">
                    רמה: {courses[current].level}
                  </span>
                  <Button
                    href={courses[current].href || `/courses/${courses[current].slug}`}
                    variant={courses[current].color === 'teal' ? 'primary' : 'secondary'}
                  >
                    לסילבוס המלא והרשמה
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Navigation - Mobile */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Previous course"
            >
              <ChevronRight className="w-6 h-6 text-teal-400" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 justify-center flex-grow">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? 'bg-teal-400 w-6' : 'bg-white/20'
                  }`}
                  aria-label={`Go to course ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Next course"
            >
              <ChevronLeft className="w-6 h-6 text-teal-400" />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4 text-text-secondary text-sm">
            {current + 1} / {courses.length}
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid gap-10 md:grid-cols-2">
        {courses.map((course) => (
          <GlassCard
            key={course.slug}
            className={`flex flex-col h-full border-t-4 ${
              course.color === 'teal' ? 'border-teal-400' : 'border-royal-500'
            } !p-0 overflow-hidden`}
          >
            {/* Syllabus Preview Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
              <img
                src={course.image}
                alt={`${course.title} Syllabus`}
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge variant={course.color as any}>{course.duration}</Badge>
              </div>
            </div>

            <div className="p-8 pt-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <span className="text-xs text-text-muted font-medium">רמה: {course.level}</span>
                <Button
                  href={course.href || `/courses/${course.slug}`}
                  variant={course.color === 'teal' ? 'primary' : 'secondary'}
                >
                  לסילבוס המלא והרשמה
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
