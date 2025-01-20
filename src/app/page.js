"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import Card from './components/Card';
import Spinner from './components/Spinner';

const Home = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/newest`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data.products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'><Spinner /></div>;
  }

  // Helper function to get image URL safely
  const getProductImageUrl = (product) => {
    // Check if product exists and has swiperImages
    if (product && product.swiperImages && product.swiperImages.swiperImage1) {
      return `${apiUrl}/products${product.swiperImages.swiperImage1}`;
    }
    // Return a fallback image if no product image is available
    return '/placeholder-product.png'; // Make sure to have a placeholder image in your public folder
  };
  
  return (
    <div className="main">

      {/* First section of home page */}

      <section className="mt-24 relative">
        <img src="/background1.png" alt="Wearable Air Purifier" className="w-screen h-screen object-cover" />
        <div className="mt-4 absolute inset-0 flex flex-col items-center justify-start sm:justify-center sm:top-2/3 sm:left-2/3 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-2/4 text-center px-4 py-4">
          <h1 className="text-neutral-900 text-[20px] md:text-[20px] lg:text-[25px] font-bold motion-preset-pop">
            Airvida - Nešiojamas oro valytuvas
          </h1>
          <p className="text-neutral-900 text-[20px] md:text-[20px] lg:text-[25px] font-bold motion-preset-pop">
            <span className="text-teal-500 mr-1 text-[20px] md:text-[20px] lg:text-[25px]">99%</span>
            žiedadulkių pašalinimo procentas
          </p>
        </div>
      </section>

      {/* Second section of home page */}

      <section className="bg-gradient-to-b from-black to-gray-500 flex md:flex-row flex-col items-center ">
        <div className="mt-6 mx-5" data-aos="fade-up">
          <h1 className="text-white text-[18px] md:text-[36px] mb-12">Airvida testavimo rezultatai iš autoritetingų laboratorijų:</h1>
          <h1 className="text-white text-[14px] md:text-[20px] mb-12">Airvida pašalina 99,9 % žiedadulkių ir PM2.5 (oro teršalų) iš oro<sup className="text-[12px] md:text-[14px]">1&nbsp;</sup>(Tolimųjų infraraudonųjų spindulių asociacija, Japonija)</h1>
          <h1 className="text-white text-[14px] md:text-[20px] mb-12">Airvida pašalina 99,9 % virusų iš oro<sup className="text-[12px] md:text-[14px]">2&nbsp;</sup>(Kitasato aplinkos mokslų tyrimų centras, Japonija)</h1>
          <p className="text-white text-[10px] md:text-[14px] mb-6"><sup className="text-[10px] md:text-[14px]">1&nbsp;</sup>Remiamasi oficialiomis bandymų ataskaitomis 220S-1018, 219S-981, 219S-918, 216S-755, 218S-873 ir 219S-985 iš Tolimųjų infraraudonųjų spindulių asociacijos (Japonija).</p>
          <p className="text-white text-[10px] md:text-[14px] mb-16"><sup className="text-[10px] md:text-[14px]">2&nbsp;</sup>Remiantis oficialia bandymų ataskaita Nr. 2020_0031 iš Japonijos Kitasato aplinkos mokslų tyrimų centro, testavimas buvo atliktas 0,2 kubinio metro erdvėje. Testuotas virusas buvo Escherichia coli fažas MS2 NBRC 102619, o testuoti modeliai – L1, M1 ir C1.</p>
        </div>
        <img src="/background5.png" alt="ible Airvida virusų šalinimo ataskaita" className="w-1/2 h-auto" data-aos="fade-up" />
      </section>

      {/* Third section of home page */}

      <section className="relative inline-block">
        <img src="/background6.png" alt="Wearable Air Purifier" className="w-screen h-screen object-cover" />
        <div className="absolute inset-0 flex flex-col items-center text-center text-neutral-900 px-2 justify-center" data-aos="fade-up">
          <h6 className="text-[24px] text-neutral-900 md:text-[36px] mb-4">Ar žinojai?</h6>
          <h2 className="text-[14px] text-neutral-900 md:text-[24px] mb-2">Ilgalaikis PM2.5 poveikis yra susijęs su padidėjusia</h2>
          <h2 className="text-[10px] text-neutral-900 md:text-[24px] text-white mb-2">išeminės širdies ligos mirtingumo, cerebrovaskulinio mirtingumo ir insulto rizika.</h2>
          <h2 className="text-[10px] text-neutral-900 md:text-[18px]">Šaltinis: žurnalas „Arteriosclerosis, Thrombosis, and Vascular Biology“</h2>
        </div>
      </section>

      {/* Fourth section of home page */}

      <section className="bg-gradient-to-b from-white to-yellow-200 h-auto flex items-center justify-center p-10">
        <div className="flex flex-col items-center ">
          <h1 className="text-[24px] md:text-[36px] text-center text-neutral-900 mb-8 md:mb-14" data-aos="fade-up">Kaip Airvida valo oro teršalus?</h1>
          <div className="flex flex-wrap items-center justify-center gap-6 ">
            <div className="flex flex-col items-center mb-10 md:mb-14 w-full sm:w-72 md:w-80 lg:w-96 divBorder" data-aos="fade-up">
              <img src="/robot1.png" alt="Dėvimas oro valytuvas" className="w-full h-auto object-cover" />
              <article className="text-center text-neutral-900 mt-4 font-bold">Oro dalelės, įskaitant</article>
              <p className="text-center text-neutral-900">PM2.5, PM10, žiedadulkes, formaldehidą, pasyvius dūmus, augintinių pleiskanas</p>
            </div>
            <div className="flex flex-col items-center mb-10 md:mb-14 w-full sm:w-72 md:w-80 lg:w-96 divBorder" data-aos="fade-up">
              <img src="/robot2.png" alt="Dėvimas oro valytuvas" className="w-full h-auto object-cover" />
              <article className="text-center text-neutral-900 mt-4 font-bold">Airvida generuoja neigiamus jonus</article>
              <p className="text-center text-neutral-900">Airvida generuoja 2 milijonus neigiamų jonų kas 0,6 sekundės aplink vartotojo veido sritį</p>
            </div>
            <div className="flex flex-col items-center mb-10 md:mb-14 w-full sm:w-72 md:w-80 lg:w-96 divBorder" data-aos="fade-up">
              <img src="/robot3.png" alt="Dėvimas oro valytuvas" className="w-full h-auto object-cover" />
              <article className="text-center mt-4 font-bold text-neutral-900">Neigiamieji jonai prisitvirtins prie aplinkinių dalelių</article>
              <p className="text-center text-neutral-900">Paversdami jas didesnėmis ir sunkesnėmis dalelėmis, kurios nusileidžia ant žemės</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth section of home page */}

      <section className='p-10 bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center'>
          <article className='text-neutral-900 text-[1.5rem] lg:text-[2rem] mb-2' data-aos="fade-up">Sinsinačio universiteto atlikto tyrimo duomenimis, viruso įsiskverbimo į N95 greitis yra &gt;5%.</article>
          <p className='text-neutral-900 lg:text-[1rem] ' data-aos="fade-up">Airvida nešiojamas oro valytuvas sustiprina apsaugą ir sumažina daugiau nei 96,31% virusų įkvėpimą per minutę, sumažindamas virusų sustingimą šalia nosies ir burnos.</p>
          <img src='/background30.png' data-aos="fade-up" />
        </div>
      </section>

      {/* Sixth section of home page */}

      <section className="bg-gradient-to-b from-white to-yellow-200 flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 items-center justify-center p-10">
        <div className="relative mx-5 mb-5" data-aos="fade-up">
          <img src='/background2.png' className='rounded-lg' />
          <p className='absolute inset-0 flex items-center justify-center text-xl sm:text-[2rem] rounded-lg'>Žiedadulkės / Alergenai</p>
        </div>
        <div className="relative mx-5 mb-5" data-aos="fade-up">
          <img src='/background3.png' className='rounded-lg'/>
          <p className='absolute inset-0 flex items-center justify-center text-xl sm:text-[2rem] rounded-lg'>Naminių gyvūnų pleiskanos</p>
        </div>
        <div className="relative mx-5 mb-5" data-aos="fade-up">
          <img src='/background10.png' className='rounded-lg'/>
          <p className='absolute inset-0 flex items-center justify-center text-xl sm:text-[2rem] rounded-lg'>PM2.5</p>
        </div>
        <div className="relative mx-5 mb-5" data-aos="fade-up">
          <img src='/background11.png' className='rounded-lg'/>
          <p className='absolute inset-0 flex items-center justify-center text-xl sm:text-[2rem] rounded-lg'>Virusas ore</p>
        </div>
      </section>

      {/* Seventh section of home page - Cards */}
      <section className="bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center">
        <article className="mb-10 text-center text-[36px] font-bold text-neutral-900 p-10" data-aos="fade-up">
          Sužinokite daugiau apie Airvida produktus
        </article>
        <div className='flex flex-wrap justify-center gap-6' data-aos="fade-up">
          {products.map((product) => (
            <div key={product._id} className="p-4" data-aos="zoom-in-down">
              <Card 
                image={getProductImageUrl(product)}
                title={product.name || 'Product Name'} 
                description={product.summary || 'No description available'}  
                link={`/product/${product._id}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
