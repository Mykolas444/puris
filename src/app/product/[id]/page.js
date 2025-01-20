"use client";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import MessageForm from '../../components/MessageForm';
import Spinner from '@/app/components/Spinner';

const Product = ({ params: initialParams }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await initialParams;
        setParams(resolvedParams);
      } catch (error) {console.error("Error resolving params:", error);}
    };
    resolveParams();
  }, [initialParams]);

  useEffect(() => {
    if (!params?.id) return;
    AOS.init();

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        const product = data.data?.product;
        if (product) {setProduct(product);}
      } else {console.error("Failed to fetch product");}
      } catch (error) {console.error("Error fetching product:", error);
      } finally {setIsLoading(false);}
    };
    fetchProduct();
  }, [params, apiUrl]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (!product) {
    return (<div className="flex justify-center items-center h-screen"><h1 className="text-[35px] text-neutral-900 font-bold motion-preset-compress">Produktas nerastas</h1></div>);
  }

  const swiperImages = Object.values(product.swiperImages || {}).filter(Boolean);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col items-center justify-center mt-32 w-full">
        <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">{product.name}</h1>

        {/* First Section: Product Images and Summary */}
        <section className="w-full bg-gradient-to-b from-white to-yellow-200  py-8 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-6">
            <div className="aspect-square w-full flex justify-center items-center px-5" data-aos="zoom-in-down">
              <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="w-full max-w-md aspect-square">
                {swiperImages.map((image, index) => (
                  <SwiperSlide key={index} className="bg-gradient-to-b from-white to-yellow-200 rounded-2xl shadow-2xl">
                    <img src={`${apiUrl}/products${image}`} className="object-contain w-full h-full rounded-2xl p-4" alt={`${product.name} - Image ${index + 1}`} /></SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-8 divBorder rounded-2xl bg-white min-h-[400px]" data-aos="zoom-in-down">
              <img src="/logo3.png" alt="Logo" className="mb-2" />
              <h2 className="text-[25px] text-yellow-700 text-2xl mb-2">{product.name}</h2>
              <p className="text-gray-700 text-center max-w-lg text-justify">{product.summary}</p>
            </div>
          </div>
        </section>

        {/* Second Section: Product Properties */}
        <section className="w-full bg-gradient-to-b from-yellow-200 to-white py-0 md:py-8 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-6">
            <div className="order-2 md:order-1 flex flex-col p-6 md:p-8 divBorder rounded-2xl bg-white" data-aos="zoom-in-down">
              <h2 className="text-[35px] text-gray-700 text-center mb-8">Savybės</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  product[`properties${num}`] && (
                  <div key={num} className="space-y-1">
                    <h3 className="font-semibold text-gray-800">{product[`properties${num}`][`propertiesArticle${num}`]}</h3>
                    <p className="text-gray-700 text-sm text-justify">{product[`properties${num}`][`propertiesSummary${num}`]}</p>
                  </div>)
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 aspect-square w-full flex items-center justify-center" data-aos="zoom-in-down">
              <img src={`${apiUrl}/products${product.contentImages.contentImage1}`} className="rounded-2xl h-96" alt={product.name || "Default Image"}/>
            </div>
          </div>
        </section>

        {/* Third Section: Specifications */}
        <section className="w-full bg-gradient-to-b from-white to-yellow-200 py-8 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-6">
            <div className="aspect-square w-full flex items-center justify-center" data-aos="zoom-in-down">
              <img src={`${apiUrl}/products${product.contentImages.contentImage2}`} className="rounded-2xl h-96" alt={product.name}/>
            </div>
            <div className="flex flex-col p-6 md:p-8 divBorder rounded-2xl bg-white" data-aos="zoom-in-down">
              <h2 className="text-[35px] text-gray-700 text-center mb-8">Specifikacijos</h2>
              <div className="space-y-4">
                {Object.entries({'Svoris': 'weight', 'Dimensijos': 'dimensions', 'Galia': 'power', 'Veikimo temperatura': 'operating_temperature', 'Nominali dregme': 'relative_humidity', 'Negatyvus jonai': 'negative_ions'}).map(([label, key]) => (
                  <div key={key} className="space-y-1">
                    <h3 className="font-semibold text-gray-800">{label}:</h3>
                    <p className="text-gray-700 text-sm text-justify">{product.specifications?.[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fourth Section: Contact Form */}
        <section className="w-full bg-gradient-to-b from-yellow-200 to-white py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center">
            <div className="text-center mb-16 text-justify px-4">
              <h2 className="text-[2rem] md:text-[4rem] text-neutral-900 mb-4" data-aos="zoom-in-down">Mechanizmas</h2>
              <p className="text-[1rem] text-neutral-900" data-aos="zoom-in-down">Ore esančios dalelės (įskaitant PM2.5, formaldehidą (CHO), alergenus, tokius kaip dūmai, dulkių erkės, žiedadulkės ir naminių gyvūnų pleiskanos) yra itin kenksmingos sveikatai.</p>
              <p className="text-[1rem] text-neutral-900" data-aos="zoom-in-down">Airvida gali veiksmingai pašalinti ore esančias daleles, generuodamas 2 milijonus neigiamų jonų per sekundę, kurie prisitvirtina prie šių dalelių, paversdami jas didesniais ir sunkesniais gabalėliais, kurie nukrenta ant žemės.</p>
              <p className="text-[1rem] text-neutral-900" data-aos="zoom-in-down">Kaip nematoma kaukė, šie daugybė neigiamų jonų apsaugos jus nuo teršalų įkvėpimo.</p>
            </div>
            <div>
              <img className="w-full" data-aos="fade-up" src="/Mechanism.png" alt="Mobile Center Logo" />
            </div>
          </div>
        </section>

        {/* Fifth Section: Video content */}
        <section className="w-full bg-gradient-to-b from-white to-yellow-200">
          <div className="max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
            <article className="mb-10 text-center text-[2rem] md:text-[4rem]  font-bold text-neutral-900 p-10" data-aos="fade-up">Gydytojo liudijimas</article>
            <iframe className="h-96 w-10/12" data-aos="fade-up" src="https://www.youtube.com/embed/rwGKvUxRndQ?feature=oembed" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </section>

        {/* Sixth Section: Contact Form */}
        <section className="w-full bg-gradient-to-b from-yellow-200 to-white py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
            <div className="text-center mb-16">
              <h2 className="text-[2rem] md:text-[4rem] font-bold text-neutral-900 mb-4" data-aos="zoom-in-down">Norite bendradarbiauti?</h2>
              <p className="text-[1rem] md:text-[2rem] font-bold text-neutral-900" data-aos="zoom-in-down">Užpildykite formą ir mes su jumis susisieksime</p>
            </div>
            <MessageForm />
          </div>
        </section>
      </div>
    </div>
  );
};


export default Product;
