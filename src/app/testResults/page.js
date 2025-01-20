"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Research = () => {
  useEffect(()=> {AOS.init()},[])

  return (  
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Tyrimų rezultatai</h1>
      <img src='/testResults.png' data-aos="fade-up"/>
    </div>
  );
};

export default Research;