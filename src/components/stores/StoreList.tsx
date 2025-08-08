'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/mock-data';
import { StoreCard } from './StoreCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreListProps {
  title: string;
  description?: string;
  stores: Store[];
  viewAllHref?: string;
}

export function StoreList({ title, description, stores, viewAllHref }: StoreListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scrollAmount = direction === 'left'
      ? -container.clientWidth
      : container.clientWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    // Check scrollability after the scroll animation completes
    setTimeout(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }, 300);
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>

          {viewAllHref && (
            <Button variant="outline" asChild>
              <Link href={viewAllHref}>View All</Link>
            </Button>
          )}
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {stores.map((store) => (
              <div key={store.id} className="min-w-[300px] max-w-[300px]">
                <StoreCard store={store} />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background shadow-md rounded-full h-10 w-10 opacity-80 hidden md:flex"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background shadow-md rounded-full h-10 w-10 opacity-80 hidden md:flex"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}