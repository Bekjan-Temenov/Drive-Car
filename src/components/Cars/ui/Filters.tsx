import { useState } from "react";
import { carModels } from "../../admin/cars/ui/CreateCar";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

interface FiltersProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedYear: string;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Filters: React.FC<FiltersProps> = ({
  handleSearchChange,
  search,
  selectedBrands,
  setSelectedBrands,
  selectedModels,
  setSelectedModels,
  selectedYear,
  handleYearChange,
  setMinPrice,
  setMaxPrice,
}) => {
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleBrandDropdown = () => setIsBrandOpen(!isBrandOpen);
  const toggleModelDropdown = () => setIsModelOpen(!isModelOpen);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setSelectedModels([]);
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const selectedModelsByBrand = selectedBrands.reduce((acc, brand) => {
    const models = carModels[brand as keyof typeof carModels];
    if (models) {
      acc[brand] = models;
    }
    return acc;
  }, {} as Record<string, string[]>);


  return (
    <div className="w-[305px]  bg-[#161A21] rounded-[10px] p-6">
      <form className="flex flex-col gap-6">
        <div>
          <h3 className="mb-4 text-white">Search</h3>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            value={search}
            className="w-full mb-3 bg-transparent border border-[#EBEBEB] rounded-[12px] px-4 py-2 text-white placeholder-white"
          />

          <div className="flex items-center justify-between gap-[8px]">
            <input
              type="number"
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full mb-3 bg-transparent border border-[#EBEBEB] rounded-[12px] px-4 py-2 text-white placeholder-white"
              placeholder="От"
            />
            <input
              type="number"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mb-3 bg-transparent border border-[#EBEBEB] rounded-[12px] px-4 py-2 text-white placeholder-white"
              placeholder="До"
            />
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={toggleBrandDropdown}
            className="w-full cursor-pointer flex justify-between items-center text-start mb-3 bg-transparent border border-[#EBEBEB] rounded-[12px] px-4 py-2 text-white placeholder-white"
          >
            Марка
            {isBrandOpen ? (
              <FaAngleUp className="ml-2" />
            ) : (
              <FaAngleDown className="ml-2" />
            )}
          </button>
          {isBrandOpen && (
            <>
              <div className="w-full bg-transparent custom-scrollbar scrollbar-hidden border-white border-b  gap-[6px]  p-2 h-[400px] overflow-y-auto ">
                {Object.keys(carModels).map((brand) => (
                  <label
                    key={brand}
                    className=" text-white my-2 flex items-center text-[17px] font-[400]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="appearance-none h-5 w-5 border-2 border-[#006AFF] rounded-full bg-[#161A21] checked:bg-[#006AFF] checked:border-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#006AFF] mr-2 cursor-pointer"
                    />
                    {brand}
                  </label>
                ))}
              </div>
              <button
                onClick={toggleBrandDropdown}
                type="button"
                className="text-white bg-[#006AFF] w-full mt-2 px-4 py-2 rounded-[12px] hover:bg-[#0055CC] transition-all"
              >
                Выбрать
              </button>
            </>
          )}
        </div>

        <div className="relative mt-2">
          <button
            type="button"
            onClick={toggleModelDropdown}
            className="w-full cursor-pointer mb-3 bg-transparent border text-start border-[#EBEBEB] rounded-[12px] px-4 py-2 text-white flex justify-between items-center placeholder-white "
            disabled={selectedBrands.length === 0}
          >
            Модель
            {isModelOpen ? (
              <FaAngleUp className="ml-2" />
            ) : (
              <FaAngleDown className="ml-2" />
            )}
          </button>
          {isModelOpen && selectedBrands.length > 0 && (
            <div className="w-full bg-transparent custom-scrollbar scrollbar-hidden border-white border-b gap-[6px] p-2 h-[400px] overflow-y-auto">
              {Object.keys(selectedModelsByBrand).map((brand) => (
                <div key={brand} className="mb-4">
                  <h3 className="text-lg font-semibold text-[#006AFF]">
                    {brand}
                  </h3>
                  <hr className="my-2 border-t border-[#006AFF]" />

                  {selectedModelsByBrand[brand].map((model) => (
                    <label
                      key={model}
                      className="text-white my-2 flex items-center text-[17px] font-[400]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model)}
                        onChange={() => handleModelChange(model)}
                        className="appearance-none cursor-pointer h-5 w-5 border-2 border-[#006AFF] rounded-full bg-[#161A21] checked:bg-[#006AFF] checked:border-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#006AFF] mr-2"
                      />
                      {model}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full cursor-pointer bg-[#161A21] mb-3  border text-start border-[#EBEBEB] rounded-[12px] pl-2 py-3 text-white flex justify-between items-center placeholder-white custom-scrollbar scrollbar-hidden"
        >
          <option className="" value="">
            Выберите год
          </option>
          {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Filters;
