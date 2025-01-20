"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import MessageForm from "../components/MessageForm";
import { useState, useEffect } from "react";
import contactData from "../data/contactsData";

const Contacts = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  useEffect(() => {
    AOS.init();
  }, []);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 5000);
  };

  return (
    <div className="overflow-hidden">
    <div className="flex flex-col items-center justify-center mt-32 w-full">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-5 motion-preset-compress">Susisiekite su mumis</h1>
      <section className="w-full bg-gradient-to-b from-white to-yellow-200 flex items-center justify-center space-x-0 md:space-x-20 flex-col md:flex-row px-4 py-8 md:px-8 py-16">
        <div data-aos="zoom-out-down" className="flex justify-center items-center mb-5">
          <a href="https://www.mobilecenter.lt/" target="blank"><img className="w-full h-36" src="/mclogo1.svg" alt="Mobile Center Logo" /></a>
        </div>
        <div data-aos="zoom-out-down" className="space-y-4 flex flex-col">
          <ul className="space-y-2">
            {contactData.map((item, index) => (
              <li key={index} className="flex items-center space-x-2 text-neutral-900 relative">
                <img src={item.icon} alt={`${item.label} Icon`} className="w-4 h-4"/>
                <span>{`${item.label}: ${item.value}`}</span>
                <img src={copiedIndex === index ? "/check.svg" : "/copy.svg"} alt={copiedIndex === index ? "Copied" : "Copy Icon"} onClick={() => handleCopy(item.value, index)} className="w-4 h-4 cursor-pointer" title={copiedIndex === index ? "Copied!" : "Copy to Clipboard"}/>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-gradient-to-b from-yellow-200 to-white flex justify-center items-center w-full px-2">
        <MessageForm />
      </section>
    </div>
    </div>
  );
};

export default Contacts;