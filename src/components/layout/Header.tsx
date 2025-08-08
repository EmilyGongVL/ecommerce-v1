'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store/useCartStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, ShoppingCart, Package, Search } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { data: session } = useSession();
  const totalItems = useCartStore(state => state.totalItems);
  const hydrated = useCartStore(state => state.hydrated);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render any client-specific content until after hydration
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">VivaMarket</span>
          </Link>

          <div className="relative w-full max-w-sm mx-8">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8 pr-4"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Skip rendering theme toggle and user-specific items until mounted */}
            <div className="w-24"></div> {/* Placeholder for authenticated elements */}
          </div>
        </div>
      </header>
    );
  }

  // The cart badge should only be shown after both client-side mounting and zustand hydration
  const showCartBadge = mounted && hydrated && totalItems() > 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">VivaMarket</span>
        </Link>

        <div className="relative w-full max-w-sm mx-8">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8 pr-4"
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {session ? (
            <>
              <Link href="/wishlist" className="relative">
                <Heart className="h-6 w-6" />
              </Link>

              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {showCartBadge && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {totalItems()}
                  </span>
                )}
              </Link>

              <Link href="/orders" className="relative">
                <Package className="h-6 w-6" />
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
              <Button onClick={() => signIn()}>
                Login / Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}