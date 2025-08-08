'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'login' | 'register') => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (type === 'login') {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError('Invalid email or password');
          setIsLoading(false);
          return;
        }

        // Redirect to home page after successful login
        router.push('/');
        router.refresh();
      } catch (error) {
        setError('An error occurred during login');
        setIsLoading(false);
      }
    } else {
      // For demo purposes, we'll just redirect since we don't have a real backend
      // In a real application, you'd make an API call to create a user
      router.push('/');

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <span className="text-2xl font-bold text-primary">VivaMarket</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, 'login')}>
              <CardContent className="space-y-4 mt-4">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => document.querySelector('[value="register"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    )}
                  >
                    Sign Up
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, 'register')}>
              <CardContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => document.querySelector('[value="login"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    )}
                  >
                    Sign In
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>

        <div className="px-8 pb-8">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="space-x-2" onClick={() => signIn('google')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12C22 10.93 21.84 9.91 21.55 8.96L12 9V13.5H17.57C17.23 15.04 16.38 16.18 15.21 16.94L18.53 19.48C20.5 17.59 22 15 22 12Z" fill="#4285F4" stroke="none" /><path d="M12 22.5C14.97 22.5 17.5 21.47 19.35 19.48L15.76 16.94C14.74 17.63 13.45 18.04 12 18.04C9.00001 18.04 6.47001 16.08 5.53001 13.28L2.12001 15.76C3.98001 19.82 7.70001 22.5 12 22.5Z" fill="#34A853" stroke="none" /><path d="M5.53 13.28C5.28 12.58 5.14 11.83 5.14 11.04C5.14 10.25 5.28 9.5 5.53 8.8L2.12 6.32C1.41 7.77 1 9.38 1 11.04C1 12.7 1.41 14.31 2.12 15.76L5.53 13.28Z" fill="#FBBC05" stroke="none" /><path d="M12 5.04C13.73 5.04 15.26 5.67 16.44 6.78L19.5 3.72C17.5 1.86 14.97 0.75 12 0.75C7.70001 0.75 3.98001 3.43 2.12001 7.49L5.53001 9.97C6.47001 7.17 9.00001 5.04 12 5.04Z" fill="#EA4335" stroke="none" /></svg>
              <span>Google</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}