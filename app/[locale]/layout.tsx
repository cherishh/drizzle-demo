import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/shared/header';
import { PostHogProvider } from '@/app/(analytics)/ph-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'playground',
  description: 'playground for nextjs 15, RSC, drizzle, auth, etc.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  if (!routing.locales.includes(locale as any)) notFound();

  return (
    <ClerkProvider>
      <html lang={locale} className='h-full'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex h-full flex-col antialiased`}
        >
          <PostHogProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange // 如果不禁止，在 dark 模式下刷新会有一个从白到黑的flash
            >
              <NextIntlClientProvider messages={messages}>
                <Header />
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
