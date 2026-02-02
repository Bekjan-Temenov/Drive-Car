import React, { useEffect } from "react";
import Container from "../../../shared/helpers/Container";
import icon from "../../../assets/user/svg/ri_shopping-bag-2-line.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchCar } from "../../../components/admin/cars/store/action";
import { Car } from "../../../shared/types/types";
import { addFavoriteCar } from "../../admin/cars/store/slice";
import { toast, Toaster } from "react-hot-toast";

const Cars: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cars, loading, error } = useSelector((state: RootState) => state.car);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        await dispatch(fetchCar({ search: "", sortOption: "new", minPrice: 0, maxPrice: 99999999999 }))
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCarsData();
  }, [dispatch]);

  const addFavoriteCars = (car: Car) => {
    dispatch(addFavoriteCar(car));
    toast.success("Машина добавлена в избранное");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="py-[10px] md:py-20">
      <Toaster />
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {cars.slice(0, 12).map((car: Car, index: number) => (
            <div
              key={index}
              className="bg-[#1E2832]/50 rounded-[15px] md:rounded-[20px] h-auto p-2 md:p-4 overflow-hidden  hover:bg-[#1E2832] transition-all cursor-pointer group relative"
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
                    className="w-full h-[100px] md:h-[160px] object-cover hover:scale-105 transition-all rounded-[8px]"
                  />
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-white mt-5 md:mt-8 font-[600] text-[15px] md:text-[20px]">
                  {car.price}$
                </span>

                <button
                  onClick={() => addFavoriteCars(car)}
                  className=" bg-[#006AFF] cursor-pointer px-4 py-3 rounded-tl-[20px]    absolute bottom-0 right-0"
                >
                  <img src={icon} alt="Add to cart" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/cars">
            <button className="bg-[#006AFF] cursor-pointer text-white px-8 py-3 rounded-[12px] hover:bg-[#0055CC] transition-colors">
              Показать еще
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Cars;
