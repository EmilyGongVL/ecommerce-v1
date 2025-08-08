'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { StoreCard } from '@/components/stores/StoreCard';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { getItemsByType, removeItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeItems = mounted ? getItemsByType('store') : [];
  const productItems = mounted ? getItemsByType('product') : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        <Tabs defaultValue="stores" className="mb-8">
          <TabsList>
            <TabsTrigger value="stores">Stores ({storeItems.length})</TabsTrigger>
            <TabsTrigger value="products">Products ({productItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="stores" className="mt-6">
            {storeItems.length === 0 ? (
              <EmptyState
                title="No saved stores yet"
                description="You haven't added any stores to your wishlist."
                action={{
                  label: "Explore Stores",
                  href: "/"
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {storeItems.map((item) => (
                  <div key={item.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-10 bg-background/80 rounded-full"
                      onClick={() => removeItem(item.id)}
                    >
                      <Heart className="h-5 w-5 fill-primary text-primary" />
                    </Button>

                    {/* We're mocking a store here */}
                    <StoreCard
                      store={{
                        id: item.id,
                        name: item.name,
                        description: "This is a placeholder description for the store.",
                        image: item.image,
                        rating: 4.5,
                        sales: 100,
                        isNew: false,
                        isUpcoming: false,
                        isStarred: true,
                        createdAt: new Date().toISOString(),
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            {productItems.length === 0 ? (
              <EmptyState
                title="No saved products yet"
                description="You haven't added any products to your wishlist."
                action={{
                  label: "Explore Products",
                  href: "/"
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden h-full">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10 bg-background/80 rounded-full"
                        onClick={() => removeItem(item.id)}
                      >
                        <Heart className="h-5 w-5 fill-primary text-primary" />
                      </Button>

                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                      </CardTitle>
                    </CardHeader>

                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-bold">${item.price?.toFixed(2)}</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
}

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <Heart className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button asChild>
        <Link href={action.href}>{action.label}</Link>
      </Button>
    </div>
  );
}