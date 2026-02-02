import React, { useEffect, useState } from "react";
import Container from "../../../shared/helpers/Container";
import { Link } from "react-router-dom";
import icon from "../../../assets/user/svg/ri_shopping-bag-2-line.svg";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCar } from "../../admin/cars/store/slice";
import { Car } from "../../../shared/types/types";
import { toast, Toaster } from "react-hot-toast";
import { AppDispatch, RootState } from "../../../app/store";
import Filters from "./Filters";
import { fetchCar } from "../../admin/cars/store/action";
import Skeleton from "react-loading-skeleton";
import { MdClear } from "react-icons/md";

const Cars: React.FC = () => {
  const { cars, loading } = useSelector((state: RootState) => state.car);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(99999999999);
  const [search, setSearch] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("new");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchCar({ search: "", sortOption, minPrice: 0, maxPrice: 99999999999 })
    );
  }, [dispatch, sortOption]);
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const addFavoriteCars = (car: Car) => {
    dispatch(addFavoriteCar(car));
    toast.success("Машина добавлена в избранное");
  };

  const applyFilters = () => {
    setSearch("");
    setMinPrice(0);
    setMaxPrice(99999999999);
    setSelectedYear("");
    setSelectedBrands([]);
    setSelectedModels([]);
    dispatch(fetchCar({ search, sortOption, minPrice, maxPrice }));
    setOpenFilter(false);
  };

  const filteredCars = Array.isArray(cars)
    ? cars.filter((car) => {
        const matchesBrand =
          selectedBrands.length === 0 || selectedBrands.includes(car.brand);
        const matchesModel =
          selectedModels.length === 0 || selectedModels.includes(car.model);
        const matchesYear =
          selectedYear === "" || car.year === parseInt(selectedYear);
        return matchesBrand && matchesModel && matchesYear;
      })
    : cars;

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container>
      <Toaster />
      <div className="flex items-start relative  justify-between w-[100%] gap-8  mb-5">
        {openFilter && (
          <div className="fixed top-[0px] left-0 z-50 w-full h-full bg-[#161A21]/80 ">
            <div className=" flex relative flex-col bg-[#161A21] w-[80%] rounded-[12px] gap-6 lg:block">
              <MdClear onClick={() => setOpenFilter(false)} className="absolute w-6 h-6 text-white right-2 top-2"/>
              <Filters
                handleSearchChange={handleSearchChange}
                search={search}
                selectedBrands={selectedBrands}
                selectedModels={selectedModels}
                setSelectedBrands={setSelectedBrands}
                setSelectedModels={setSelectedModels}
                selectedYear={selectedYear}
                handleYearChange={handleYearChange}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
              <button
                type="button"
                onClick={applyFilters}
                className=" text-white bg-[#006AFF] w-full mt-2 px-4 py-3 rounded-[12px] hover:bg-[#0055CC] transition-all cursor-pointer"
              >
                Применить
              </button>
            </div>
          </div>
        )}
        <div className="flex-col hidden gap-6 sm:flex lg:block">
          <Filters
            handleSearchChange={handleSearchChange}
            search={search}
            selectedBrands={selectedBrands}
            selectedModels={selectedModels}
            setSelectedBrands={setSelectedBrands}
            setSelectedModels={setSelectedModels}
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <button
            type="button"
            onClick={applyFilters}
            className=" text-white bg-[#006AFF] w-full mt-2 px-4 py-3 rounded-[12px] hover:bg-[#0055CC] transition-all cursor-pointer"
          >
            Применить
          </button>
        </div>

        <div className="">
          <div className="flex items-center justify-between mb-6 md:justify-end">
            <h1
              onClick={() => setOpenFilter(!openFilter)}
              className="font-[500] text-[18px] md:text-[36px] md:hidden block text-white"
            >
              Фильтры
            </h1>
            <select
              onChange={handleSortChange}
              value={sortOption}
              className="bg-transparent text-white border cursor-pointer border-[#595959] rounded-[12px] px-4 py-2"
            >
              <option
                className="text-white bg-black hover:bg-[#4177DC]"
                value="new"
              >
                Новые
              </option>
              <option
                className="text-white bg-black hover:bg-[#4177DC]"
                value="old"
              >
                Старые
              </option>
              <option
                className="text-white bg-black hover:bg-[#4177DC]"
                value="expensive"
              >
                Дорогие
              </option>
              <option
                className="text-white bg-black hover:bg-[#4177DC]"
                value="cheap"
              >
                Бюджетные
              </option>
            </select>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {filteredCars.length === 0 && (
              <div className="grid w-full grid-cols-3 gap-6 ">
                <h1 className="min-w-full text-center text-white whitespace-nowrap ">
                  Машины не найдены
                </h1>
              </div>
            )}
            {loading ? (
              <div className="grid grid-cols-3 gap-6">
                {[
                  ...Array(6).map((_, index) => (
                    <div key={index} className="border border-white">
                      <Skeleton height={160} className="mb-3" />
                      <Skeleton width={100} height={20} className="mb-2" />
                      <Skeleton width={150} height={20} />
                      <Skeleton height={50} className="mt-4" />
                    </div>
                  )),
                ]}
              </div>
            ) : (
              <>
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-[#1E2832]/50 rounded-[20px] h-auto p-3 md:p-4 overflow-hidden relative hover:bg-[#1E2832] transition-all cursor-pointer group"
                  > 
                    <Link to={`/data-cars/${car.id}`}>
                      <div className="flex flex-row items-center justify-between mb-3 md:items-start md:flex-col">
                        <h3 className="font-medium text-white">{car.brand}</h3>
                        <p className="text-sm text-gray-400">{car.model}</p>
                      </div>
                      <div className="relative">
                        <img
                          src={car.images[0]}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-[100px]  hover:scale-105 transition-all object-cover rounded-[8px]"
                        />
                      </div>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-white mt-4 md:mt-8 font-[600] text-[18px] md:text-[20px]">
                        {car.price}$
                      </span>
                      <button
                        onClick={() => addFavoriteCars(car)}
                        className="bg-[#006AFF] cursor-pointer px-4 py-3 rounded-tl-[20px] absolute bottom-0 right-0"
                      >
                        <img src={icon} alt="Add to cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cars;
