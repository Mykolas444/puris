"use client"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Button from '../components/Button';
import Link from 'next/link';

const Research = () => {
  useEffect(()=> {AOS.init()},[])

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Tyrimai</h1>

      {/* First section of research page */}

      <section className="bg-gradient-to-b from-white to-yellow-200 flex flex-col justify-center items-center w-full">
        <article className="mb-10 text-center text-[25px] font-bold text-neutral-900 p-10" data-aos="fade-up">PM2.5 šalinimo bandymas atviroje vietovėje</article>
        <iframe className="h-96 w-10/12" data-aos="fade-up" src="https://www.youtube.com/embed/QmSGeN-GQmY?start=30" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </section>

      {/* Second section of research page */}

      <section className='bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full'>
        <h1 className='mb-10 text-center text-[25px] font-bold text-neutral-900 p-10' data-aos="fade-up">Tarptautinė laboratorijos sertifikavimo ataskaita</h1>
        <div className='flex flex-wrap gap-8 justify-center items-center mx-10'>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle7.png' alt='Japan Far Infrared Association' className='w-72 ' />
            <p className='text-yellow-700 text-[25px]'>＞99.9%</p>
            <p className='text-neutral-900'>Japonijos tolimųjų infraraudonųjų spindulių asociacija</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle5.png' alt='Japan Far Infrared Association' className='w-72'/>
            <p className='text-yellow-700 text-[25px]'>＞99.9%</p>
            <p className='text-neutral-900'>Japonijos tolimųjų infraraudonųjų spindulių asociacija</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle9.png' alt='Japan Far Infrared Association' className='w-72'/>
            <p className='text-yellow-700 text-[25px]'>＞99.9%</p>
            <p className='text-neutral-900'>Japonijos Kitasato aplinkos mokslų tyrimų centras</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle11.png' alt='Japan Far Infrared Association' className='w-72'/>
            <p className='text-yellow-700 text-[25px]'>＞99.7%</p>
            <p className='text-neutral-900'>Japonijos Kitasato aplinkos mokslų tyrimų centras</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle3.png' alt='Japan Far Infrared Association' className='w-72'/>
            <p className='text-yellow-700 text-[25px]'>＞99%</p>
            <p className='text-neutral-900'>SGS</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/circle1.png' alt='Japan Far Infrared Association' className='w-72'/>
            <p className='text-yellow-700 text-[25px]'>＞90.8%</p>
            <p className='text-neutral-900'>SGS ir mokslinės technologijos</p>
          </div>
        </div>
      </section>

      {/* Third section of research page */}

      <section className='mt-10 pb-10 bg-gradient-to-b from-white to-yellow-200 flex flex-col justify-center items-center w-full'>
        <h1 className='mb-10  text-center text-[25px] font-bold text-neutral-900 p-10' data-aos="fade-up">Tarptautinis pripažinimas</h1>
        <div className='flex flex-wrap gap-8 justify-center items-center mx-10'>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor1.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor2.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor4.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor6.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor8.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
          <div className='flex flex-col justify-center items-center text-center w-full sm:w-2/6 divBorder' data-aos="fade-up">
            <img src='/honor10.png' alt='Japan Far Infrared Association' className='w-72'/>
          </div>
        </div>
      </section>

      {/* Fourth section of research page */}

      <section className='pb-10 bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full'>
        <h1 className='mb-10  text-center text-[25px] font-bold text-neutral-900 p-10' data-aos="fade-up">Tyrimų rezultatai</h1>
        <img src='/background7.png' data-aos="fade-up" />
        <Link href='/testResults'><Button className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Peržiūrėti rezultatus</Button></Link>
      </section>

      {/* Fifth section of research page */}

      <section className=' bg-gradient-to-b from-white to-yellow-200 flex flex-col justify-center items-center w-full'>
        <h1 className='text-center text-[25px] font-bold text-neutral-900 p-10 ' data-aos="fade-up">Rekomendacijos</h1>
        <div className='flex flex-col justify-center items-center mx-10'>
          
          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6  mb-5 flex flex-col items-center justify-center'>
              <img src='/people1.png' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5' />
              <p className='text-neutral-900'>Vaist. Chuang</p>
              <p className='text-neutral-900'>Farmacija</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Mes nusipelnėme geresnės oro kokybės!</p>
              <p className='text-neutral-900 mb-5'>Mano dukra kenčia nuo sunkios alergijos. Ji nuolat čiaudi ruošdama namų darbus ir mokydamasi, todėl jai labai sunku susikaupti dėl suaktyvėjusių alerginių simptomų. Panaudojus Airvida jos simptomai taip pat labai pagerėjo.</p>
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6  mb-5 flex flex-col items-center justify-center'>
              <img src='/people2.png' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5' />
              <p className='text-neutral-900'>Dakt. Lin</p>
              <p className='text-neutral-900'>Plastinės chirurgijos skyrius</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Šalia kaukės dėvėjimo turėkite papildomą sveikatos apsaugos sluoksnį</p>
              <p className='text-neutral-900 mb-5'>Pasirinkau naudoti Airvida, nes noriu papildomai apsaugoti savo kvėpavimo takus, nes ilgalaikis oro taršos poveikis, ypač esant dideliam kiekiui, gali sukelti rimtų ligų, įskaitant insultą ir plaučių vėžį. „Airvida“ gaminiai yra sertifikuoti ir išbandyti pirmaujančių laboratorijų visame pasaulyje, todėl, dėvint su profesionaliais drabužiais, tai mažiau pastebima lyginant su kitais panašiais gaminiais.</p>
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6  mb-5 flex flex-col items-center justify-center'>
              <img src='/people3.png' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5' />
              <p className='text-neutral-900'>Vaist. Hsu</p>
              <p className='text-neutral-900'>Farmacija</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Reikšmingas skirtumas tarp nešiojimo ir nedėvėjimo!</p>
              <p className='text-neutral-900 mb-5'>Turiu sunkią nosies alergiją, todėl kiekvieną vakarą turiu gerti vieną antihistamininį preparatą, kad ryte nepaveiktų. Mėnesį nešiojus Airvida, mano alergijos simptomai palaipsniui mažėjo, o vaistų vartojimo dažnis taip pat sumažėjo nuo kasdienės iki tik tada, kai reikia!</p>
            </div>
          </div>
          </div>
          </section>

          {/* Fifth section of research page // same as previous, purpose - for background layout */}

      <section className='bg-gradient-to-b from-yellow-200 to-white flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center mx-10'>
          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6  mb-5 flex flex-col items-center justify-center'>
              <img src='/people4.png' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5 rounded-full' />
              <p className='text-neutral-900'>Dakt. Chen</p>
              <p className='text-neutral-900'>Anesteziologijos skyrius</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Kadangi oro kokybė kasdien tampa baisi, labai svarbu išvalyti orą visur!</p>
              <p className='text-neutral-900 mb-5'>Mano gyvenamoji vieta yra apsupta užteršto oro, todėl dažnai užgulu nosį ir niežtinčias akis net užsidėjus kaukę. Aš taip pat turiu rinito problemą. Nešiojus Airvida, minėta būklė tikrai pagerėjo! Be to, man reikia ilgai dirbti chirurgijos kabinete, todėl labai svarbu, kaip išvengti elektrokoaguliacijos (plaučių vėžio kancerogeno) dūmų. Dėl to, manau, Airvida dėvėti norint apsisaugoti darbo valandomis yra būtina.</p>
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6 flex flex-col items-center justify-center'>
              <img src='/people5.jpg' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5 rounded-full' />
              <p className='text-neutral-900'>Vaist. Huang</p>
              <p className='text-neutral-900'>Farmacija</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Kovodama su oro tarša, pasirinkau Airvidą.</p>
              <p className='text-neutral-900 mb-5'>Oro tarša daro didžiulį poveikį žmonių sveikatai. Kad neįkvėpčiau KD2,5 ir oro taršos, apsisaugoti pasirinkau Airvidą; Taip pat radau, kad mano giminaičių ir pacientų alergijos oro lašeliniu būdu iš esmės pagerėjo panaudojus Airvida!</p>
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-center items-center text-center w-full divBorder mx-10 mb-5' data-aos="fade-up">
            <div className='lg:w-2/6 flex flex-col items-center justify-center'>
              <img src='/people6.jpg' alt='Japan Far Infrared Association' className='w-48 h-48 mb-5 rounded-full' />
              <p className='text-neutral-900'>Dakt. Hsieh</p>
              <p className='text-neutral-900'>Šeimos medicinos skyrius</p>
            </div>
            <div className='lg:p-24 lg:w-4/6 p-0'>
              <p className='text-yellow-700 text-[25px] mb-5'>Nosies paburkimo simptomai sumažėja užsidėjus Airvida!</p>
              <p className='text-neutral-900 mb-5'>Veiksmingiausi alerginių reakcijų prevencijos būdai yra sumažinti alergenų įkvėpimo, sąlyčio su jais ir jų nurijimo tikimybę. Man labai sunku sustabdyti tokius simptomus kaip čiaudulys, nosies užgulimas ir pasunkėjęs kvėpavimas, kai atsiranda alergija. Po Airvida dėvėjimo pastebiu, kad mano alerginiai simptomai labai pagerėjo.</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Research;