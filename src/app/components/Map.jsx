import React from 'react';

const Map = () => {
  return (
    <div className="overflow-hidden rounded-lg">
      <iframe className="w-full h-full" src="https://www.google.com/maps/embed/v1/place?q=mobile+center&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" allowFullScreen loading="lazy"></iframe>
    </div>
  );
};

export default Map;
