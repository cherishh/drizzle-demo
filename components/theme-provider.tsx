'use client';

import * as React from 'react';
import { type ThemeProviderProps } from 'next-themes';
const NextThemesProvider = dynamic(() => import('next-themes').then(e => e.ThemeProvider), {
  ssr: false,
});

import dynamic from 'next/dynamic';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
