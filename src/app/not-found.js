"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Link from "next/link";

const Custom404 = () => {
  useEffect(()=> {AOS.init()},[])

  return (
    <div className="flex flex-col h-screen items-center justify-center mt-32">
      <h1 className="text-[35px] font-bold mt-8 mb-8 motion-preset-compress motion-preset-expand text-gray-700">Puslapis nerastas</h1>
      <p className="text-lg mt-5 text-center w-fit motion-preset-expand text-gray-700">Atsiprašome, bet ieškomo puslapio neradome.</p>
      <img src="/error_404.png" alt="Error 404" className="mt-14 w-1/2 h-auto motion-preset-expand" />
      <Link href="/" className="mt-14 w-24 h-auto"><img className="w-full motion-preset-pop" src="/logo2.png" alt="Ible Logo"/></Link>
    </div>
  );
};

export default Custom404;
