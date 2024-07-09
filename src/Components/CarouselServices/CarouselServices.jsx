import React, { useState, useEffect } from 'react';

export const CarouselServices = ({img1,img2,img3,img4, alt}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  const carouselTransitionDuration = 2000;
  const carouselStaticDuration = 2000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, carouselTransitionDuration + carouselStaticDuration);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="w-full h-screen mb-2 overflow-hidden  flex justify-center  ">

      

        <div className="w-full  mt-16">
          <div className="overflow-hidden relative h-full">

            <div
              className="flex transition-transform ease-out"
              style={{
                transitionDuration: `${carouselTransitionDuration}ms`,
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <img className="object object-contain " src={img1} alt={alt} />
              <img className="object-cover" src={img2} alt={alt} />
              <img className="object object-contain" src={img3} alt={alt} />
              <img className=" object-cover" src={img4} alt={alt} />
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-6">
              
              <button
                className="p-1 rounded-full z-10 shadow bg-black text-white hover:bg-slate-300 hover:text-black"
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
