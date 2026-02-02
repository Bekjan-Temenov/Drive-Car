import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../shared/helpers/Container";
import { Advertisement } from "../../../shared/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { fetchAds } from "../../admin/advertisements/store/action";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import telegram from "../../../assets/user/svg/Vector (4).svg";
import instagram from "../../../assets/user/svg/Vector (6).svg";

const Carousel: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await dispatch(fetchAds());
      setAds(response.payload);
    };
    fetchAd();
  }, [dispatch]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + ads.length) % ads.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads]);

  return (
    <div className="relative h-[200px]  md:h-[600px] overflow-hidden">
      
      <AnimatePresence initial={false} custom={direction}>
        {ads.length > 0 && (
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full overflow-hidden bg-center bg-cover "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("${ads[currentIndex]?.image}")`,
            }}
          >
            <Container>
              <div className="flex flex-col md:mt-[100px] mt-[20px] items-start justify-center w-full h-full gap-6 my-auto text-white  ">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[22px] md:text-[55px] font-[500] mb-2 md:mb-4 max-w-[660px]"
                >
                  {ads[currentIndex]?.description}
                </motion.h1>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#01060E96] border rounded-tl-[25px] text-[10px] rounded-br-[25px] cursor-pointer px-10 py-2 rounded-[10px]"
                >
                  {ads[currentIndex]?.button_text}
                </motion.button>
                <div className="flex items-center justify-between gap-[20px] md:gap-[60px]  ">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[12px] md:text-[20px]  "
                  >
                    {ads[currentIndex]?.title}
                  </motion.p>
                  <div className="flex items-center gap-[40px] ">
                    <Link to={ads[currentIndex]?.telegram_url}>
                      <img
                        className="cursor-pointer w-[15px] md:w-[24px] h-[15px] md:h-[24px]"
                        src={telegram}
                        alt="Telegram"
                      />
                    </Link>
                    <Link to={ads[currentIndex]?.instagram_url}>
                      <img
                        className="cursor-pointer w-[15px] md:w-[24px] h-[15px] md:h-[24px]"
                        src={instagram}
                        alt="Instagram"
                      />
                    </Link>
                    <Link to={ads[currentIndex]?.whatsapp_url}>
                      <FaWhatsapp className="cursor-pointer w-[17px] h-[17px] md:w-[27px] md:h-[27px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="absolute z-10 flex items-center justify-center w-[30px] h-[30px] md:w-[50px] rounded-full md:h-[50px] text-lg md:text-4xl text-white transform -translate-y-1/2 bg-[#14171BBD] cursor-pointer left-2 md:left-4 top-1/2"
        onClick={() => paginate(-1)}
      >
        ‹
      </button>
      <button
        className="absolute z-10 text-lg md:text-4xl text-white flex bg-[#14171BBD] w-[30px] h-[30px] cursor-pointer items-center justify-center md:w-[50px] rounded-full md:h-[50px] transform -translate-y-1/2 right-2 md:right-4 top-1/2"
        onClick={() => paginate(1)}
      >
        ›
      </button>

      <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {ads.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
