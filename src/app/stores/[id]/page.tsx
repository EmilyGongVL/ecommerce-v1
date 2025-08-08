'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { getStoreById, getProductsByStoreId } from '@/lib/mock-data';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StorePageProps {
  params: {
    id: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  const store = getStoreById(params.id);
  const products = getProductsByStoreId(params.id);

  const { addItem, hasItem, removeItem } = useWishlistStore();
  const [activeTab, setActiveTab] = useState('products');

  if (!store) {
    notFound();
  }

  const isLiked = hasItem(store.id);

  const toggleLike = () => {
    if (isLiked) {
      removeItem(store.id);
    } else {
      addItem({
        id: store.id,
        name: store.name,
        image: store.image,
        type: 'store',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <div className="relative h-[40vh] w-full">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 container flex flex-col justify-end pb-8">
            <div className="flex justify-between items-end">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
                <p className="text-lg mt-2 max-w-xl">{store.description}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{store.rating.toFixed(1)}</span>
                  </div>
                  <div>
                    <span>{store.sales.toLocaleString()} sales</span>
                  </div>
                </div>
              </div>

              <Button
                variant={isLiked ? "secondary" : "outline"}
                size="lg"
                className={isLiked ? "bg-white text-primary" : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"}
                onClick={toggleLike}
              >
                <Heart className={`mr-2 h-5 w-5 ${isLiked ? "fill-primary text-primary" : ""}`} />
                {isLiked ? "Saved" : "Save Store"}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Card key={product.id} className="overflow-hidden h-full">
                      <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-square w-full overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                      </Link>

                      <CardHeader className="p-4">
                        <CardTitle className="text-base">
                          <Link href={`/products/${product.id}`}>{product.name}</Link>
                        </CardTitle>
                      </CardHeader>

                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No products available at this time.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">About {store.name}</h2>
                <p className="text-muted-foreground mb-6">
                  {store.description}
                </p>
                <p className="text-muted-foreground mb-6">
                  {store.description} We strive to provide the best products and customer service to our valued customers.
                </p>

                <h3 className="text-xl font-bold mb-2">Store Information</h3>
                <ul className="space-y-2">
                  <li><strong>Founded:</strong> {new Date(store.createdAt).toLocaleDateString()}</li>
                  <li><strong>Rating:</strong> {store.rating.toFixed(1)} out of 5</li>
                  <li><strong>Total Sales:</strong> {store.sales.toLocaleString()}</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        J
                      </div>
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <div className="flex items-center text-yellow-500">
                          ★★★★★ <span className="text-muted-foreground ml-1 text-sm">5.0</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Amazing store with great products. The customer service is excellent and delivery was faster than expected.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        S
                      </div>
                      <div>
                        <h4 className="font-medium">Sarah Smith</h4>
                        <div className="flex items-center text-yellow-500">
                          ★★★★ <span className="text-muted-foreground ml-1 text-sm">4.0</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Great selection of products. Would definitely shop here again!
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}