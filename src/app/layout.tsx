import NunitoFonts from '@/utils/fonts';
import '@/styles/globals.css';

import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'AP Nail Art',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={NunitoFonts.className}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app relative'>
          <div className='absolute top-0 w-full'>
            <NavBar />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
