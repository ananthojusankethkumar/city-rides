import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'City Rides | Premium Car Rental India',
  description: 'Modern car rental booking platform serving cities across India with secure bookings and transparent pricing.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
