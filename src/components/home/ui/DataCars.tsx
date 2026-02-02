import React, { useState } from "react";
import { Car } from "../../../shared/types/types";

interface DataCarsProps {
  findCar: Car;
}

const DataCars: React.FC<DataCarsProps> = ({ findCar }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const carData = {
    specs: [
      { label: "Модель", value: findCar?.model },
      { label: "Двигатель", value: findCar?.engine },
      { label: "Руль", value: findCar?.condition },
      { label: "Пробег", value: findCar?.mileage },
      { label: "Цвет", value: findCar?.color },
      { label: "Объем", value: findCar?.body_type },
      { label: "Состояние", value: findCar?.status },
      { label: "Год", value: findCar?.year },
      { label: "Цена", value: findCar?.price },
    ],
    description: findCar?.description,
  };

  return (
    <section className="py-10">
      {findCar && (
        <>
          <h1 className="font-500 text-[25px] md:text-[36px] mb-6 text-white">
            {findCar.brand} {findCar.year} года за ~ {findCar.price}$
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="flex flex-col ">
              <div className="bg-[#111213]  rounded-[20px] p-2 md:p-6">
                <h1 className="text-white text-[32px] font-[500] ">
                  {findCar.model}
                </h1>
                <div className="relative">
                  <img
                    src={selectedImage || findCar.images[0]}
                    alt="Audi"
                    className="w-full h-[300px] m y-4  object-contain  rounded-[12px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 oberflow-x-auto md:grid-cols-5">
                  {findCar.images.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(thumb)}
                      className={`w-full h-[60px] object-cover rounded-[8px] cursor-pointer transition-all duration-300 ${
                        selectedImage === thumb
                          ? "border-2 border-[#006AFF]"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className=" rounded-[20px] p-6">
                <h2 className="mb-6 text-2xl font-medium text-white">
                  {findCar.brand} {findCar.year} года за ~ {findCar.price}$
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {carData.specs.map((spec, index) => (
                    <div key={index} className="flex flex-col w-full md:w-[80%]">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{spec.label}</span>
                        <span className="text-white">{spec.value}</span>
                      </div>
                      <hr className="border-[#595959] w-full " />
                    </div>
                  ))}
                  <button className="bg-[#006AFF] mt-8  w-[80%] cursor-pointer text-white px-8 py-3 rounded-[12px] hover:bg-[#0055CC] transition-all duration-300">
                    Купить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-[20px] p-6">
            <p className="mb-4 text-white last:mb-0">{carData.description}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default DataCars;
