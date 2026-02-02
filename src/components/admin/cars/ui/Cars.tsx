import React, { useEffect, useState } from "react";
import deleteIcon from "../../../../assets/admin/svg/delete.svg";
import editIcon from "../../../../assets/admin/svg/edit.svg";
import CreateCar from "./CreateCar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { deleteCar, fetchCar } from "../store/action";
import { Toaster } from "react-hot-toast";
import { Car } from "../../../../shared/types/types";

const Cars: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    cars = [],
    error,
    loading,
  } = useSelector((state: RootState) => state.car);
  const [car, setCar] = useState<Car | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        await dispatch(fetchCar({search: "", sortOption: ""}));
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCarsData();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteCar(id));
    await dispatch(fetchCar({search: "", sortOption: "new"}));
  };

 const carId = (id : number) => {
   const car = cars.find((car) => car.id === id)
   setCar(car || null)
   setIsOpen(true)
 }

  return (
    <div className="p-4 select-none bg-[#0C192E] rounded-[20px] w-full">
      <div className="flex items-center justify-between w-full border-b border-[#D9D9D9]">
        <h1 className="mb-4 text-2xl font-bold text-white">Мои машины</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 mb-4 cursor-pointer text-white bg-[#306AD9] rounded-[8px]"
        >
          + Добавить
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-10">
          <CreateCar car={car} setIsOpen={setIsOpen} />
        </div>
      )}

      <div className="max-h-[527px] overflow-y-auto custom-scrollbar scrollbar-hidden">
        {cars.length > 0 ? (
          <table className="min-w-full mt-5 text-white">
            <thead>
              <tr>
                <th className="py-2 text-center w-[180px]">Фото</th>
                <th className="py-2 text-center">Марка</th>
                <th className="py-2 text-center">Модель</th>
                <th className="py-2 text-center">Цена</th>
                <th className="py-2 text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.id}
                  className="text-center border-b border-[#D9D9D9]"
                >
                  <td className="flex items-center justify-center py-2">
                    {car.images?.length > 0 ? (
                      <img
                        src={car.images?.[0]}
                        alt="Car"
                        className="object-cover rounded-[10px] w-[180px] h-[100px]"
                      />
                    ) : (
                      <span className="text-gray-400">Нет фото</span>
                    )}
                  </td>
                  <td className="py-2">{car.brand || "—"}</td>
                  <td className="py-2">{car.model || "—"}</td>
                  <td className="py-2">{car.price ? `${car.price}` : "—"}$</td>
                  <td className="py-2">
                    <div className="flex gap-[26px] items-center justify-center">
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="cursor-pointer w-[18px] h-[22px]"
                        onClick={() => carId(car.id)}
                      />
                      <hr className="w-[1px] h-[30px] bg-[#777272] rounded-full" />
                      <img
                        onClick={() => handleDelete(car.id.toString())}
                        src={deleteIcon}
                        alt="Delete"
                        className="cursor-pointer w-[18px] h-[22px]"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center text-gray-400">Нет доступных машин</p>
        )}
      </div>

      {loading && <h1>Loading...</h1>}
      {error && <h1 className="text-red-600">Error</h1>}
      <Toaster />
    </div>
  );
};

export default Cars;
