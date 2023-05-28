import '@/styles/globals.css';
import NunitoFonts from '@/utils/fonts';
import NavBar from '@/components/navbar/NavBar';

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
