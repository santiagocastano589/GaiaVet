import React, { useState } from 'react';
import img1 from '../../assets/peluqueria.jpg';


export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  return (
    <>
      <div className=" w-full mt-2 mb-2 overflow-hidden flex justify-center">

        <div className="w-2/4">

          <div className="overflow-hidden relative">
            
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <img className="w-full" src={img1} alt="1" />
              <img className="w-full" src={img1} alt="2" />
              <img className="w-full" src={img1} alt="3" />
              <img className="w-full" src={img1} alt="4" />
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-6">
              <button
                className="p-1 rounded-full shadow bg-black text-white hover:bg-slate-300 hover:text-black"
                onClick={prevSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="p-1 rounded-full shadow bg-black text-white hover:bg-slate-300 hover:text-black"
                onClick={nextSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};