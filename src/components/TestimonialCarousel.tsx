import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  city: string;
  image: string;
  text: string;
  rating: number;
  result: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length, autoPlayInterval]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden">
        {/* Testimonial Content */}
        <div className="p-8 md:p-12 min-h-96 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto">
            {/* Stars Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Result Highlight */}
            <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-green-500">
              <p className="text-green-700 font-bold text-lg">
                ✅ {currentTestimonial.result}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
              />
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  {currentTestimonial.name}
                </p>
                <p className="text-gray-600">{currentTestimonial.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-green-600 w-8'
                : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-gray-600 font-semibold">
        {currentIndex + 1} de {testimonials.length}
      </div>
    </div>
  );
}
