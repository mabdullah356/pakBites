import React, { useState, useEffect } from "react";
import Deal1 from "../../assets/Images/Deals/deals1.jpg";
import Deal2 from "../../assets/Images/Deals/deals2.jpg";
import Deal3 from "../../assets/Images/Deals/deals3.jpg";

import RealSpeacial from "./RealSpeacial";

const slides = [Deal1, Deal2, Deal3];

export default function Special() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-8">
      {}
      <div className="relative md:block hidden w-full max-w-6xl h-64 md:h-96 my-6 bg-amber-400 mx-auto overflow-hidden rounded-xl shadow-lg">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <RealSpeacial />
    </div>
  );
}
