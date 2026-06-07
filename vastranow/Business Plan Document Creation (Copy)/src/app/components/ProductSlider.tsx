import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from './types';

interface ProductSliderProps {
  title: string;
  description?: string;
  products: Product[];
}

export default function ProductSlider({ title, description, products }: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif">{title}</h2>
            {description && <p className="mt-2 text-gray-600 max-w-2xl">{description}</p>}
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full border border-gray-300 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full border border-gray-300 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="embla overflow-hidden">
          <div className="embla__container flex gap-6 pb-2">
            {products.map(product => (
              <div className="embla__slide min-w-[280px] flex-shrink-0" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
