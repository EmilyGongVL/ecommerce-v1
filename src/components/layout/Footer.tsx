'use client';

import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState("2024"); // Default fallback

  // Set the year on the client side only
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">VivaMarket</h3>
            <p className="text-muted-foreground">
              Your destination for unique stores and products.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© {year} VivaMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}