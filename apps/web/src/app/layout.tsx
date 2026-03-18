import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'cursor-blog',
  description: 'Next.js 14 + NestJS + MongoDB blog starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <div className="mx-auto max-w-3xl px-4 py-10">{children}</div>
      </body>
    </html>
  );
}

