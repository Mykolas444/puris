import Map from "./Map";

const Footer = () => {
  return (
    <footer className="shadow-2xl mt-8 w-full p-8 bg-gradient-to-b from-white to-yellow-200 flex flex-col md:flex-row justify-between items-center h-full">
      <div className="flex items-center justify-center md:order-1 order-1 flex-grow md:w-1/3 w-full ">
        <img className="w-auto h-6 m-2" src="/facebook.png" alt="facebook icon" />
        <img className="w-auto h-6 m-2" src="/instagram.png" alt="instagram icon" />
        <a href="https://lt.linkedin.com/company/mobile-center/" target="blank" ><img className="w-auto h-6 m-2" src="/linkedin.png" alt="linkedin icon" /></a>
        <img className="w-auto h-6 m-2" src="/x.png" alt="x icon" />
      </div>
      <div className="flex flex-col items-center justify-center text-center md:text-left order-2 md:order-3 mb-4 md:mb-0 flex-grow gap-y-3 md:w-1/3 w-full">
        <div className="flex justify-center items-center w-full h-full">
          <Map />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center mb-4 md:mb-0 order-3 md:order-2 flex-grow gap-y-3 mt-auto md:w-1/3 w-full">
        <a href="https://www.mobilecenter.lt/" target="blank"><img className="w-16 h-auto m-2" src="https://www.mobilecenter.lt/images/yootheme/mobile-center-logo.svg" alt="footer image"/></a>
        <p className="text-xxs text-neutral-900">© 2025 Mobile Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


