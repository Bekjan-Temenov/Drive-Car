import React, { useState } from "react";
import DataCars from "../components/home/ui/DataCars";
import Container from "../shared/helpers/Container";
import CharacterizationCars from "../components/home/ui/CharacterizationCars";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const DataCarsPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { cars } = useSelector((state: RootState) => state.car);

  const findCar = cars.find((car) => car.id === Number(id));
  

  return (
    <Container>
      <div className="flex flex-col py-9">
        <div className="flex items-center w-full text-white border-b-[4px] border-[#4177DC]">
          <button
            onClick={() => setOpen(false)}
            className={
              !open
                ? "px-8 py-2  md:ml-[32px] cursor-pointer  rounded-t-[8px]  text-white font-[500] bg-[#4177DC] text-[20px] md:text-[24px]"
                : "px-8 py-2 cursor-pointer  rounded-t-[8px]  text-white font-[500] text-[20px] md:text-[24px] "
            }
          >
            Описание
          </button>
          <button
            onClick={() => setOpen(true)}
            className={
              open
                ? "px-8 py-2 cursor-pointer  rounded-t-[8px]  text-white font-[500] bg-[#4177DC] text-[20px] md:text-[24px]"
                : "px-8 py-2 cursor-pointer  rounded-t-[8px]  text-white font-[500] text-[20px] md:text-[24px] "
            }
          >
            Характеристика
          </button>
        </div>
        {findCar ? (
          open ? (
            <CharacterizationCars findCar={findCar} />
          ) : (
            <DataCars findCar={findCar} />
          )
        ) : (
          <div className="text-white">Нет данных</div> 
        )}
      </div>
    </Container>
  );
};

export default DataCarsPage;
