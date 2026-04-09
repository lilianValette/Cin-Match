import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// Favicon SVG inline — recreates the CinéMatch heart/film logo, no PNG file needed.
const FAVICON_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
  <rect width='100' height='100' rx='18' fill='%23131313'/>
  <defs>
    <clipPath id='h'>
      <path d='M50 88 C20 68 6 55 6 35 C6 20 16 10 30 10 C38 10 46 15 50 21 C54 15 62 10 70 10 C84 10 94 20 94 35 C94 55 80 68 50 88Z'/>
    </clipPath>
    <clipPath id='l'><rect x='0' y='0' width='50' height='100'/></clipPath>
    <clipPath id='r'><rect x='50' y='0' width='50' height='100'/></clipPath>
  </defs>
  <g clip-path='url(%23h)'>
    <rect x='0' y='0' width='50' height='100' fill='%238B1A1A'/>
    <circle cx='24' cy='24' r='5' fill='%235a0f0f'/>
    <circle cx='17' cy='39' r='4' fill='%235a0f0f'/>
    <circle cx='13' cy='54' r='3.5' fill='%235a0f0f'/>
  </g>
  <g clip-path='url(%23h)'>
    <rect x='50' y='0' width='50' height='100' fill='%231a1a1a'/>
    <path d='M50 10 L94 20 L94 10Z' fill='white'/>
    <path d='M50 10 L94 28 L94 20 L50 10Z' fill='%231a1a1a'/>
    <path d='M50 10 L94 36 L94 28 L50 10Z' fill='white'/>
    <path d='M50 10 L94 44 L94 36 L50 10Z' fill='%231a1a1a'/>
    <path d='M50 10 L94 52 L94 44 L50 10Z' fill='white'/>
  </g>
  <polygon points='38,46 38,70 63,58' fill='white' opacity='0.95'/>
</svg>`.trim();

const FAVICON_HREF = `data:image/svg+xml,${FAVICON_SVG.replace(/\n\s*/g, '')}`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>CinéMatch</title>
        <link rel="icon" type="image/svg+xml" href={FAVICON_HREF} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
