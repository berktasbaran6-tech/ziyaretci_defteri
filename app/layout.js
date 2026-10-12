import './globals.css';

export const metadata = {
  title: 'Ziyaretçi Defteri - Next.js & Neon DB',
  description: 'Next.js, Neon DB, GitHub ve Vercel ile yapılmış canlı ziyaretçi defteri',
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="notranslate" translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
