import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { ChatWidget } from '@/components/chat-widget';

export const metadata: Metadata = {
  title: 'Clinical Curator Vet',
  description: 'Plataforma educativa de veterinaria para estudiantes principiantes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
