import Image from 'next/image';
import Link from 'next/link';
import { Store } from '@/lib/mock-data';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full transition-all hover:shadow-md", className)}>
      <Link href={`/stores/${store.id}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover transition-all hover:scale-105"
          />
          {store.isNew && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              New
            </div>
          )}
          {store.isUpcoming && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              Upcoming
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              <Link href={`/stores/${store.id}`}>{store.name}</Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {store.description}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
        <div className="flex flex-col">
          <span className="font-medium text-primary">{store.rating.toFixed(1)} ★</span>
          <span>Rating</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-primary">{store.sales.toLocaleString()}</span>
          <span>Sales</span>
        </div>
      </CardFooter>
    </Card>
  );
}