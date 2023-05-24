import '../styles/globals.css';
import NunitoFonts from '../../utils/fonts';

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

        <h1 className='head_text text-center'>
          <span className='orange_gradient text-center'> AP Nail Art </span>
          <br className='max-md:hidden' />
          <p className='text-2xl sm:text-3xl'>Gift Card System</p>
        </h1>

        <main className='app'>{children}</main>
      </body>
    </html>
  );
}
