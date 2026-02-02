import React, { useState } from "react";
import galery from "../../../../assets/admin/svg/Group (4).svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { createAd, updateAd } from "../store/action";
import { Advertisement } from "../../../../shared/types/types";
import { Toaster } from "react-hot-toast";

const CreateAdvertisement: React.FC<{
  setIsOpen: (isOpen: boolean) => void;
  ad: Advertisement | null;
}> = ({ setIsOpen, ad }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    ad?.image || null
  );
  const [formData, setFormData] = useState<any>({
    title: ad?.title || "",
    description: ad?.description || "",
    image: ad?.image || selectedImage,
    button_text: ad?.button_text || "",
    instagram_url: ad?.instagram_url || "",
    telegram_url: ad?.telegram_url || "",
    whatsapp_url: ad?.whatsapp_url || "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("button_text", formData.button_text);
    data.append("image", formData.image);
    data.append("instagram_url", formData.instagram_url);
    data.append("telegram_url", formData.telegram_url);
    data.append("whatsapp_url", formData.whatsapp_url);

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (ad) {
        await dispatch(
          updateAd({
            adData: data as unknown as Advertisement,
            id: ad.id || 0,
          })
        ).unwrap();
      } else {
        await dispatch(
          createAd({ data: data as unknown as Advertisement })
        ).unwrap();
      }
    } catch (error) {
      console.log(error);
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

      <div className="flex flex-col ">
        <div className="flex items-center justify-between px-8 my-9">
          <h1 className="font-[600] text-[28px] ml-10">Заголовок</h1>
          <div className="flex bg-[#131313] w-[355px] items-center justify-center h-[255px]  gap-2 border border-white  rounded-[8px] ">
            {selectedImage ? (
              <img
                className="object-contain w-full h-full"
                src={selectedImage}
                alt=""
              />
            ) : (
              <img className="w-[39px] h-[39px]" src={galery} alt="" />
            )}
          </div>
        </div>
      </div>

      <hr className="w-full  h-[1px] bg-[#D9D9D9] rounded-full my-[20px]" />

      <h1 className="font-[600] px-[34px] whitespace-nowrap text-[24px] text-white">
        Добавить обзор активности
      </h1>
      <div className="grid grid-cols-2 px-8 items-center justify-center gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <input
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            placeholder="+996 *** ***"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <textarea
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px] "
            placeholder="Описание"
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
          <input
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            placeholder="Рассрочка 6\9\12  месяцев"
            onChange={(e) =>
              setFormData({ ...formData, button_text: e.target.value })
            }
            value={formData.button_text}
          />
          <input
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            placeholder="URL instagram"
            type="url"
            value={formData.instagram_url}
            onChange={(e) =>
              setFormData({ ...formData, instagram_url: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <label className="py-2 text-center text-white bg-transparent rounded-md cursor-pointer">
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex flex-col  items-center gap-[15px] py-[35px] px-[40px] bg-[#131313] border border-white rounded-[8px]  w-full  h-[172px]    ">
              <p className="rounded-full bg-[#306AD9] cursor-pointer text-white px-4 py-2">
                Загрузите изображение
              </p>
              <p className="text-white text-[15px] font-[600]">
                Допустимые форматы : PNG , GIF , WEBP , MP3 , and MP4{" "}
              </p>
            </div>
          </label>

          <input
            value={formData.telegram_url}
            onChange={(e) =>
              setFormData({ ...formData, telegram_url: e.target.value })
            }
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            placeholder="URL telegram"
            type="url"
          />
          <input
            value={formData.whatsapp_url}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp_url: e.target.value })
            }
            className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
            placeholder="URL whatsapp"
            type="url"
          />
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

export default CreateAdvertisement;
