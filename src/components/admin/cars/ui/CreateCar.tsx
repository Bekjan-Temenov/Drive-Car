import { useState } from "react";
import clsx from "clsx";
import YearSelect from "../../../../shared/ui/YearSelect";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { createCar, updateCar } from "../store/action";
import { Car } from "../../../../shared/types/types";
import toast, { Toaster } from "react-hot-toast";

interface CreateCarProps {
  setIsOpen: (isOpen: boolean) => void;
  car: Car | null;
}

export const carModels = {
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser"],
  Aston_Martin: ["AMR Hyperion", "DB11", "DBX", "Vantage"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  Ford: ["Focus", "Mustang", "Explorer", "F-150"],
  Chevrolet: ["Cruze", "Malibu", "Tahoe", "Silverado"],
  Mercedes: ["A-Class", "C-Class", "E-Class", "S-Class"],
  Bmw: ["3 Series", "M8", "5 Series", "X5", "X7"],
  Audi: ["A3", "A4", "Q5", "Q7"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg"],
  Nissan: ["Altima", "Maxima", "Rogue", "GT-R"],
  Hundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
  Kia: ["Rio", "Sportage", "Sorento", "Stinger"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-9"],
  Subaru: ["Impreza", "Outback", "Forester", "WRX"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Porsche: ["911", "Cayenne", "Panamera", "Taycan"],
  Jaguar: ["XE", "XF", "F-Pace", "I-Pace"],
  Landrover: ["Range Rover", "Discovery", "Defender", "Evoque"],
  Volvo: ["S60", "XC40", "XC60", "XC90"],
  Lexus: ["IS", "ES", "RX", "LX"],
  Infiniti: ["Q50", "Q60", "QX50", "QX80"],
};

const Cars: React.FC<CreateCarProps> = ({ setIsOpen, car }) => {
  const [selectedImages, setSelectedImages] = useState<File[] | string[]>(
    car?.images || []
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    car?.images[0] || null
  );
  const [selectedBrands, setSelectedBrands] = useState<string>(
    car?.brand || ""
  );
  const [selectedModels, setSelectedModels] = useState<string>(
    car?.model || ""
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(
    car?.year?.toString() || null
  );
  const [formData, setFormData] = useState<Car>({
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || parseInt(selectedYear || "0"),
    mileage: car?.mileage || 0,
    description: car?.description || "",
    body_type: car?.body_type || "",
    price: car?.price || 0,
    condition: car?.condition || "",
    color: car?.color || "",
    images: car?.images || [],
    engine: car?.engine || "",
    status: car?.status || "",
    id: car?.id || 0,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const filesArray = Array.from(files) as File[];

      setSelectedImages(filesArray);
      setSelectedImage(URL.createObjectURL(filesArray[0]));
    }
  };

  const handleSelectCover = (img: string, index: number) => {
    const updatedImages = [
      img,
      ...selectedImages.filter((_, i) => i !== index),
    ];

    setSelectedImages(updatedImages as string[]);
    setSelectedImage(img);
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("brand", selectedBrands);
    data.append("model", selectedModels);
    data.append("year", (selectedYear ? parseInt(selectedYear) : 0).toString());
    data.append("mileage", formData.mileage.toString());
    data.append("description", formData.description);
    data.append("body_type", formData.body_type);
    data.append("price", formData.price.toString());
    data.append("condition", formData.condition);
    data.append("color", formData.color);
    data.append("engine", formData.engine);
    data.append("status", formData.status);

    if (selectedImage) {
      data.append("images", selectedImage);
    }

    selectedImages
      .filter((img) => img !== selectedImage)
      .forEach((file) => {
        data.append("images", file);
      });

    try {
      if (car === null) {
        await dispatch(createCar(data as unknown as Car));
        window.location.reload();
        setTimeout(() => {
          toast.success("Машина добавлена успешно");
        }, 2000);
      } else {
        await dispatch(
          updateCar({ CarData: data as unknown as Car, id: car?.id || 0 })
        );

        window.location.reload();
        setTimeout(() => {
          toast.success("Машина оновлено успешно");
        }, 2000);
      }
    } catch (error) {
      console.error("Ошибка при добавлении автомобиля:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] h-[98%] overflow-y-auto  pb-9 bg-[#0D1117] text-white rounded-lg  custom-scrollbar scrollbar-hidden"
    >
      <h2 className=" text-xl font-bold py-3 text-center bg-[#072358] rounded-md">
        Добавить машину
      </h2>

      <div className="px-8 mt-4 ">
        <div className="grid grid-cols-5 gap-2">
          {selectedImages.map((img, index) => (
            <div
              key={index}
              className={clsx(
                "cursor-pointer border-2 border-white max-w-[123px] h-[93px] rounded-lg overflow-hidden transition",
                selectedImage === img ? "border-blue-500" : "border-transparent"
              )}
              onClick={() => handleSelectCover(img as string, index)}
            >
              <img
                src={
                  typeof img === "string"
                    ? img
                    : URL.createObjectURL(img as File)
                }
                alt="Выбор изображения"
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
        <div
          className={
            selectedImages.length === 0
              ? "text-white text-[24px] font-[700] w-full text-center"
              : "hidden"
          }
        >
          Выберите машину
        </div>
      </div>
      <hr className="w-full h-[1px] bg-[#8e8a8a] border border-[#8e8a8a] rounded-full my-[40px] px-8" />
      <div className="px-8 mt-6 ">
        <h3 className="mb-2 text-lg">Добавить обзор активности</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-8">
            <select
              value={selectedBrands}
              onChange={(e) => {
                setSelectedBrands(e.target.value);
                setSelectedModels("");
                setFormData({ ...formData, brand: e.target.value });
              }}
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            >
              {Object.keys(carModels).map((brand) => (
                <option key={brand} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </option>
              ))}
            </select>
            <div>
              <label className="block mb-1 text-gray-600">
                Выберите модель:
              </label>
              <select
                className="p-2 text-white bg-[#131313] border w-full border-[#BEBEBE] rounded-[8px]"
                value={selectedModels}
                onChange={(e) => setSelectedModels(e.target.value)}
                disabled={!selectedBrands}
              >
                <option value="" disabled>
                  -- Выберите Модель --
                </option>
                {selectedBrands &&
                  carModels[selectedBrands as keyof typeof carModels].map(
                    (model: any) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    )
                  )}
              </select>
            </div>

            <textarea
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px] "
              placeholder="Описание"
              rows={4}
            />
            <YearSelect
              selectedYear={selectedYear}
              onChange={setSelectedYear}
            />
            <input
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Цена $"
            />

            <select
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              value={formData.condition}
              className="p-2 text-[#FFFFFF]/72 bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            >
              <option value="" disabled selected>
                {car?.condition || "Руль"}
              </option>
              <option value="Правый">Правый</option>
              <option value="Левый">Левый</option>
            </select>
          </div>
          <div className="flex flex-col gap-8">
            <label className="py-2 text-center text-white bg-transparent rounded-md cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              {selectedImage ? (
                <div className="flex items-center bg-transparent overflow-hidden w-full h-[172px]">
                  <img
                    src={selectedImage}
                    alt="Выбранное"
                    className="object-contain w-full h-full bg-transparent rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-[15px] py-[35px] px-[40xp] bg-[#131313] border border-white rounded-[8px] w-full h-[172px]">
                  <p className="rounded-full bg-[#306AD9] cursor-pointer text-white px-4 py-2">
                    Загрузите изображение
                  </p>
                  <p className="text-white text-[15px] font-[600]">
                    Допустимые форматы: PNG, GIF, WEBP, MP3, MP4
                  </p>
                </div>
              )}
            </label>

            <input
              value={formData.body_type}
              onChange={(e) =>
                setFormData({ ...formData, body_type: e.target.value })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Тип кузова"
            />
            <input
              value={formData.engine}
              onChange={(e) =>
                setFormData({ ...formData, engine: e.target.value })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Двигатель"
            />
            <input
              value={formData.mileage}
              onChange={(e) =>
                setFormData({ ...formData, mileage: parseInt(e.target.value) })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Пробег"
            />
            <input
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Состояние"
            />
            <input
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
              placeholder="Цвет"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-10 px-8">
        <button
          onClick={() => setIsOpen(false)}
          className="w-full p-2 mt-6 text-white transition rounded-md bg-[#4177DC]/30 cursor-pointer hover:bg-blue-800"
        >
          Назад
        </button>
        <button
          type="submit"
          className="w-full p-2 mt-6 text-white transition rounded-md bg-[#4177DC]/30 cursor-pointer hover:bg-blue-800"
        >
          Сохранить
        </button>
      </div>
      <Toaster />
    </form>
  );
};
export default Cars;
