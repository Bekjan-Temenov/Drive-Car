import React from "react";
import shape from "../../../assets/user/svg/shape.svg";
import message from "../../../assets/user/svg/message-circle.svg";
import { Car } from "../../../shared/types/types";

interface car {
  findCar: Car;
}

const CharacterizationCars: React.FC<car> = ({ findCar }) => {
  const carInfo = {
    title: `${findCar.brand}- технические характеристики`,
    specs: {
      characteristics: [
        { label: "Марка:", value: findCar.brand },
        { label: "Модель:", value: findCar.model },
        { label: "Год выпуска:", value: findCar.year },
        { label: "Цена:", value: findCar.price },
      ],
      title: `${findCar.brand}  ${findCar.year}`,
    },
    stats: {
      views: 234,
      comments: 0,
    },
  };

  return (
    <div className="py-10">
      <h1 className="font-500 text-[22px] md:text-[36px]  text-white mb-8">
        {carInfo.title}
      </h1>

      <div className="flex flex-col items-center gap-5 md:flex-row ">
        <div className="bg-[#111213]  w-full md:w-[50%] h-auto rounded-[20px] p-6">
          <h1 className="text-white text-[32px] font-[500] mb-5">
            {findCar.model}
          </h1>

          <img
            src={findCar.images[0]}
            alt="car"
            className="w-auto h-auto object-contain rounded-[12px]"
          />
        </div>
        <div className="flex flex-col justify-between w-full h-auto ">
          <div className="h-full space-y-4 ">
            <div>
              <div className="flex items-center justify-between gap-4 ">
                <h3 className="mb-4 text-gray-400">Характеристика:</h3>
                <h3 className="text-white text-[20px] font-[500] mb-4">
                  {carInfo.specs.title}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {carInfo.specs.characteristics.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between "
                  >
                    <span className="text-gray-400 w-full md:w-[150px] ">
                      {spec.label}
                    </span>
                    <span className="text-white  md:w-[150px] ">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between  gap-[90px]">
              <div className="flex items-center gap-2">
                <img className="w-[24px] h-auto" src={shape} alt="" />
                <span className="text-gray-400">{carInfo.stats.views}</span>
              </div>
              <div className="flex items-center gap-2">
                <img className="w-[24px]  h-auto" src={message} alt="" />
                <span className="text-gray-400">{carInfo.stats.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterizationCars;
