import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { SessionProvider } from 'next-auth/react';

// Mock the cart store
jest.mock('@/lib/store/useCartStore', () => ({
  useCartStore: () => ({
    totalItems: () => 0,
  }),
}));

describe('Header Component', () => {
  it('renders the brand name', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText('VivaMarket')).toBeInTheDocument();
  });

  it('renders login button when user is not logged in', () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText('Login / Sign up')).toBeInTheDocument();
  });

  it('renders user info when logged in', () => {
    const mockSession = {
      expires: '1',
      user: { name: 'Test User', email: 'test@example.com', image: '' },
    };

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>
    );

    // We're testing if the avatar is rendered with the user's initial
    const avatarFallback = screen.getByText('T');
    expect(avatarFallback).toBeInTheDocument();
  });
});