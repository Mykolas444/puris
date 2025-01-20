"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";

const About = () => {
  useEffect(()=> {AOS.init()},[])
  
  return (
    <div className="flex flex-col items-center justify-center mt-32 w-full ">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Apie</h1>

      {/* First section of about page */}

      <section className="w-full bg-gradient-to-b from-white to-yellow-200 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8 ">
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center">
            <img className="max-w-full" src="/logo2.png" alt="Ible logo" />
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center divBorder">
            <p className="text-gray-700 text-lg text-center md:text-left"><span className="font-bold">Ible</span> yra IoT ir dėvimų įrenginių įmonė, įkurta 2015 metais. Mūsų pagrindinė idėja – kurti produktus, kurie pagerina gyvenimo kokybę ir apsaugą mūsų artimiesiems. Laikydamiesi aukštų standartų per daugybę analizės ir testavimo, siekiame pasiūlyti paprastus, efektyvius ir gerai suprojektuotus produktus kasdieniam gyvenimui.</p>
          </div>
        </div>
      </section>
     
      {/* Second section of about page */}

      <section className="w-full bg-gradient-to-b from-yellow-200 to-white py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8 ">
          <div data-aos="zoom-out-down" className="md:w-1/2 text-center order-2 md:order-1 divBorder">
            <p className="text-gray-700 text-lg text-center md:text-left"><span className="font-bold">Ible </span>reikšmė - kilusi iš vidurinės anglų kalbos, senosios prancūzų kalbos ir lotynų kalbos. Kaip priesaga ji reiškia „galintis būti“.</p>
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center gap-2 order-1 md:order-2">
            <img src="/product2.png" alt="airvida" className="w-20 sm:w-24 md:w-24 lg:w-36" />
            <img src="/product1.png" alt="airvida" className="w-20 sm:w-24 md:w-24 lg:w-36" />
            <img src="/product3.png" alt="airvida" className="w-20 sm:w-24 md:w-24 lg:w-36" />
          </div>
        </div>
      </section>

      {/* Third section of about page */}

      <section className="w-full bg-gradient-to-b from-white to-yellow-200 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center">
            <img className="max-w-full" src="/background21.png" alt="Ible logo" />
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center divBorder">
            <p className="text-gray-700 text-lg text-center md:text-left">Airvida yra <span className="font-bold">Ible</span> nešiojamų oro valytuvų serijos pavadinimas, kilęs iš žodžių „air“ (oras) ir „vida“ derinio – „vida“ ispanų kalba reiškia „gyvenimas“. Šis prasmingas pavadinimas simbolizuoja pažadą, kad kiekvienas nusipelno geresnės oro kokybės savo gyvenimui.</p>
          </div>
        </div>
      </section>

      {/* Fourth section of about page */}

      <section  className="w-full bg-gradient-to-b from-yellow-200 to-white py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
          <div data-aos="zoom-out-down" className="md:w-1/2 text-center order-2 md:order-1 divBorder">
            <p className="text-gray-700 text-lg text-center md:text-left">Airvida yra bendras Taivano ir Vokietijos dizaino kūrinys, atspindintis abiejų kultūrų meistriškumą. Airvida gaminama iš aukščiausios kokybės medžiagų, pasižymi puikiais nepriklausomų laboratorijų testų rezultatais ir mažos spinduliuotės elektromagnetinėmis bangomis – visa tai atitinka CE sertifikatą ir griežčiausius ES produktų standartus.</p>
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center gap-4 order-1 md:order-2 ">
            <img src="/background22.png" alt="airvida" className="max-w-full" />
          </div>
        </div>
      </section>

      {/* Fifth section of about page */}

      <section className="w-full bg-gradient-to-b from-white to-yellow-200 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center ">
            <img className="max-w-full" src="/background23.png" alt="Ible logo" />
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center divBorder">
            <p className="text-gray-700 text-lg text-center md:text-left"><span className="font-bold">Ible</span> siekia kurti stilingus, efektyvius ir patikimus produktus. Todėl Airvida išsiskiria elegantišku dizainu ir tvirta kokybe. Tai neabejotinai rafinuotas pasirinkimas, kuris paprastai pagerina jūsų gyvenimą.</p>
          </div>
        </div>
      </section>

      {/* Sixth section of about page */}

      <section  className="w-full bg-gradient-to-b from-yellow-200 to-white py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
          <div data-aos="zoom-out-down" className="md:w-1/2 text-center order-2 md:order-1 divBorder">
            <h1 className="text-gray-700 text-xl text-center md:text-left mb-3">Informacija apie įmonę:</h1>
            <ul  className="text-gray-700 text-xl text-center md:text-left list-disc list-inside">
              <li>Įkūrimo data - 2015 balandis</li>
              <li>Bendrovės būstinė - Taipėjus</li>
              <li>Pardavimai - parduota daugiau nei 300 000 vienetų</li>
              <li>Pagaminta - Taivane ir Japonijoje</li>
            </ul>
          </div>
          <div data-aos="zoom-out-down" className="md:w-1/2 flex justify-center items-center order-1 md:order-2">
            <img src="/background24.png" alt="airvida" className="max-w-full" />
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default About;