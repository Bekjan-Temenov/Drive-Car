import React, { useEffect, useState } from "react";
import deleteIcon from "../../../../assets/admin/svg/delete.svg";
import editIcon from "../../../../assets/admin/svg/edit.svg";
import telegram from "../../../../assets/user/svg/Vector (4).svg";
import instagram from "../../../../assets/user/svg/Vector (6).svg";
import { FaWhatsapp } from "react-icons/fa";
import CreateAdvertisement from "./CreateAdvertisement";
import { Advertisement } from "../../../../shared/types/types";
import { deleteAd, fetchAds } from "../store/action";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Advertisements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [ad, setAd] = useState<Advertisement | null>(null);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await dispatch(fetchAds());
        setAds(res.payload);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAd();
  }, []);

  const handleDelete = async (id: string) => {
    await dispatch(deleteAd(id));
    const updatedAds = await dispatch(fetchAds()).unwrap();
    setAds(updatedAds);
  };

  const handleEdit = (id: number) => {
    const ad = ads.find((ad) => ad.id === id);
    setAd(ad || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 bg-[#0C192E]/48 rounded-[20px] w-full">
      <Toaster />
      <div className="flex items-center mb-[40px] justify-between w-full border-b border-[#D9D9D9]">
        <h1 className="mb-4 text-2xl font-bold text-white">Мои машины</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 mb-4 cursor-pointer text-white bg-[#306AD9] rounded-[8px]"
        >
          + Добавить
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-10">
          <CreateAdvertisement setIsOpen={setIsModalOpen} ad={ad} />
        </div>
      )}

      <div className="flex flex-col max-h-[487px] overflow-y-auto custom-scrollbar scrollbar-hidden  gap-[40px]">
        {ads.map((ads, index) => (
          <div
            key={index}
            className="flex h-auto items-center justify-between gap-[90px] "
          >
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${ads.image}")`,
              }}
              className=" h-full w-[66%] px-[50px] flex flex-col pt-[60px] py-[16px] items-start justify-between gap-[15px]  bg-cover bg-center rounded-[10px]"
            >
              <h1 className="text-white w-[50%] text-[26px] font-monsterrat font-[600]">
                {ads.description}
              </h1>
              <button className="bg-[#01060E96] w-auto rounded-tl-[25px] rounded-br-[25px]  cursor-pointer px-10 py-2 rounded-[10px] ">
                {ads.button_text}
              </button>
              <div className="flex items-center gap-[90px]">
                <button className="border cursor-pointer border-white rounded-full px-[22px] py-[12px] text-white text-[13px] font-[500]">
                  {ads.title}
                </button>
                <div className="flex items-center gap-4">
                  <Link to={ads.telegram_url}>
                    <img
                      className="cursor-pointer w-[24px] h-[24px]"
                      src={telegram}
                      alt="Telegram"
                    />
                  </Link>
                  <Link to={ads.instagram_url}>
                    <img
                      className="cursor-pointer w-[24px] h-[24px]"
                      src={instagram}
                      alt="Instagram"
                    />
                  </Link>
                  <Link to={ads.whatsapp_url}>
                    <FaWhatsapp className="cursor-pointer w-[27px] h-[27px]" />
                  </Link>
                 
                </div>
              </div>
            </div>
            <div className="flex gap-[26px] items-center justify-center">
              <img
                onClick={() => handleEdit(ads.id)}
                src={editIcon}
                alt="Edit"
                className="cursor-pointer w-[18px] h-[22px]"
              />
              <hr className="w-[2px] h-[30px] bg-[#FFFFFF]/60 border-white  rounded-full" />
              <img
                onClick={() => handleDelete(ads.id.toString())}
                src={deleteIcon}
                alt="Delete"
                className="cursor-pointer w-[18px] h-[22px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
