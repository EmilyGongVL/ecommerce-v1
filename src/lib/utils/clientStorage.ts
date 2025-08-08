/**
 * Utilities for safely working with client-side storage in Next.js
 * to avoid hydration mismatches
 */

// Check if code is running on the client
export const isClient = typeof window !== 'undefined';

/**
 * Safely get an item from localStorage
 * Returns null on server-side
 */
export function getLocalStorageItem(key: string): string | null {
  if (!isClient) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
}

/**
 * Safely set an item in localStorage
 * No-op on server-side
 */
export function setLocalStorageItem(key: string, value: string): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
}

/**
 * Safely get an item from sessionStorage
 * Returns null on server-side
 */
export function getSessionStorageItem(key: string): string | null {
  if (!isClient) return null;
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing sessionStorage:', error);
    return null;
  }
}

/**
 * Safely set an item in sessionStorage
 * No-op on server-side
 */
export function setSessionStorageItem(key: string, value: string): void {
  if (!isClient) return;
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting sessionStorage item:', error);
  }
}

/**
 * Hook to safely use client-side storage in React components
 */
export function safelyParsedStorage<T>(storageKey: string, defaultValue: T): T {
  if (!isClient) return defaultValue;

  try {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing storage for key ${storageKey}:`, error);
    return defaultValue;
  }
}