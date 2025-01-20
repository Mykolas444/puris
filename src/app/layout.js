import { Oswald } from 'next/font/google';
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const OswaldRegular = Oswald({
  subsets: ['latin'],
  weight: '500', 
  variable: '--font-Oswald-regular',
});

export const metadata = {
  title: "Alergenu atmusejai",
  description: "Alergenu atmuseju puslapis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${OswaldRegular.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
