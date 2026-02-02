import React from "react";
import Uslugi from "../components/home/ui/Uslugi.tsx";
import Cars from "../components/home/ui/Cars.tsx";
import About from "../components/home/ui/About.tsx";
import Reviews from "../components/home/ui/Reviews.tsx";
import Carousel from "../components/Cars/ui/Carousel.tsx";

const HomePage: React.FC = () => {
  return (
    <div>
      <Carousel />
      <Uslugi />
      <div className="flex flex-col text-white text-center w-full my-[10px] md:my-[44px]">
        <h1 className="font-[500] text-[18px] md:text-[36px] mb-4 ">ВСЕ АВТО КЫРГЫЗСТАНА </h1>
        <p className="font-[500] text-[15px] md:text-[32px]">Выбери свой автомобиль </p>
      </div>
      <Cars />
      <h1 className="text-white text-center mx-auto text-[18px] md:text-[32px] w-full md:max-w-[887px] px-1 font-[600] mb-[20px] md:mb-[44px]">
        3 аргумента почему вам стоит доверить решение вашего автомобильного
        вопроса{" "}
      </h1>
      <About />
      <div className="flex flex-col mx-auto items-center text-white text-center w-full mt-5 my-[22px] lg:my-[44px]">
        <h1 className="font-[500] text-[18px] md:text-[36px] text-center mb-4 flex items-center gap-[10px]">
          <div className="border-[3px] border-[#1D1D3B] w-[48px] rounded-full"></div>{" "}
          ЧТО ГОВОРЯТ{" "}
          <span className="bg-[#001A72]  px-[27px] rounded-[3px]">ЛЮДИ</span>
          <div className="border-[3px] border-[#1D1D3B] w-[48px] rounded-full"></div>{" "}
        </h1>
        <p className="font-[500] text-[15px] md:text-[24px] lg:w-[933px]">
          В данном сервисе мы уже собрали для вас отзывы от наших клиентов,
          которые уже воспользовались нашим сервисом по подбору автомобиля{" "}
        </p>
      </div>
      <Reviews />
    </div>
  );
};
export default HomePage;