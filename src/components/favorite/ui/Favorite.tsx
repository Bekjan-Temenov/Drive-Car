import React from "react";
import Container from "../../../shared/helpers/Container";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { removeFavoriteCar } from "../../admin/cars/store/slice";
import { toast, Toaster } from "react-hot-toast";

const Favorite: React.FC = () => {
  const { favoriteCars } = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteFavoriteCar = (id: string) => {
    dispatch(removeFavoriteCar(id));
    toast.error("Машина удалена из избранного");
  };

  return (
    <Container>
      <Toaster />
      <div className="grid grid-cols-2 gap-3 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {favoriteCars.map((car) => (
          <div
            key={car.id}
            className="bg-[#1E2832]/50 rounded-[20px] h-auto p-4 overflow-hidden relative hover:bg-[#1E2832] transition-all cursor-pointer group"
          >
            <Link to={`/data-cars/${car.id}`}>
              <div className="flex flex-row items-center justify-between mb-3 md:flex-col">
                <h3 className="font-medium text-white">{car.brand}</h3>
                <p className="text-sm text-gray-400">{car.model}</p>
              </div>
              <div className="relative">
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-[100px] md:h-[160px] hover:scale-105 transition-all object-cover rounded-[8px]"
                />
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-white mt-4 md:mt-8 font-[600] text-[20px]">
                {car.price}$
              </span>
              <button
                onClick={() => handleDeleteFavoriteCar(car.id.toString())}
                className=" bg-[#FF4949] cursor-pointer px-4 py-3 rounded-tl-[20px]    absolute bottom-0 right-0"
              >
                <MdDeleteOutline className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
        {favoriteCars.length === 0 && (
          <div className="col-span-4">
            <p className="text-2xl text-center text-white">Не чего нет</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Favorite;
