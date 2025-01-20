"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-2xl p-8 bg-gradient-to-b from-yellow-200 to-white">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="w-24 h-auto">
          <img className="w-full h-auto motion-preset-pop" src="/logo1.png" alt="Ible Logo"/>
        </Link>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900">
            <img className="w-8 h-auto" src="https://www.svgrepo.com/show/506800/burger-menu.svg" alt="Menu Icon" />
          </button>
        </div>
        <div className="hidden lg:flex space-x-14">
          <div>
            <Link href="/about" className="text-neutral-900 hover:text-xl transition-all duration-300">APIE</Link>
          </div>
          <div>
            <Link href="/research" className="text-neutral-900 hover:text-xl transition-all duration-300">TYRIMAI</Link>
          </div>
          <div>
            <Link href="/products" className="text-neutral-900 hover:text-xl transition-all duration-300">PRODUKTAI</Link>
          </div>
          <div>
            <Link href="/contacts" className="text-neutral-900 hover:text-xl transition-all duration-300">KONTAKTAI</Link>
          </div>
        </div>
      {/* Mobile Menu */}
        <div className={`fixed bg-gradient-to-b from-yellow-200 to-white lg:hidden top-0 left-0 w-full h-full shadow-lg flex flex-col items-center justify-center space-y-4 transform transition-all duration-300 ease-in-out ${ isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
          <button className="absolute top-8 right-8 text-gray-700" onClick={() => setIsMenuOpen(false)}><img className="w-8 h-auto" src="https://www.svgrepo.com/show/500512/close-bold.svg" alt="Close Menu Icon" /></button>
          <Link href="/" className="w-24 h-auto mb-5" onClick={() => setIsMenuOpen(false)}><img className="w-full h-auto" src="https://airvida.co/wp-content/uploads/2018/04/ible-logo.png" alt="Ible Logo" /></Link>
          <Link href="/about" className="text-lg font-medium text-neutral-900" onClick={() => setIsMenuOpen(false)}>APIE</Link>
          <Link href="/research" className="text-lg font-medium text-neutral-900" onClick={() => setIsMenuOpen(false)}>TYRIMAI</Link>
          <Link href="/products" className="text-lg font-medium text-neutral-900" onClick={() => setIsMenuOpen(false)}>PRODUKTAI</Link>
          <Link href="/contacts" className="text-lg font-medium text-neutral-900" onClick={() => setIsMenuOpen(false)}>KONTAKTAI</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
