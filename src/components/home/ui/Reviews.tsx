import React, { useEffect, useState } from "react";
import Container from "../../../shared/helpers/Container";
import { motion, AnimatePresence } from "framer-motion";
import ReviewForm from "./ReviewForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getReviews } from "../store/action";
import { MdOutlineStar } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";

export interface Review {
  length: any;
  id: number;
  user_id: string;
  comment: string;
  created_at: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await dispatch(getReviews());
      setReviews(res.payload);
    };
    fetchReviews();
  }, [dispatch]);
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Телефон
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Планшет
      } else {
        setVisibleCount(3); // Ноутбук и выше
      }
    };

    updateVisibleCount(); // Вызываем сразу
    window.addEventListener("resize", updateVisibleCount); // Слушаем изменения экрана

    return () => window.removeEventListener("resize", updateVisibleCount); // Чистим обработчик
  }, []);
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  const visibleItem = Array.from({length: visibleCount}, (_,i) => i);
  return (
    <section className="md:py-20">
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-[24px] sm:text-[28px] md:text-[32px] font-medium mb-6 sm:mb-8 md:mb-10">
            Отзывы клиентов
          </h2>

          <div className=" w-full  flex gap-4 sm:gap-6 md:gap-[21px] mb-6 sm:mb-8">
            {visibleItem.map((offset) => (
              <AnimatePresence mode="wait" initial={false} key={offset}>
                <motion.div
                  key={reviews[(currentIndex + offset) % reviews.length]?.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: offset * 0.1,
                  }}
                  className="bg-[#1A1C7182] w-full h-[240px] sm:h-[250px] md:h-[268px] flex flex-col justify-between overflow-y-auto custom-scrollbar gap-2 scrollbar-hide rounded-[16px] sm:rounded-[18px] md:rounded-[20px] px-4 sm:px-5 md:px-6 py-4 relative"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <img
                      src="https://yt3.googleusercontent.com/R1vlhyGLOoLp2Ygon20Xm960qKA3nY85fPUB7jRyyjaU3Wl6J2nQCNYrFm8dta1CeuLT-5tP=s900-c-k-c0x00ffffff-no-rj"
                      alt="icon"
                      className="w-10 h-10 rounded-full sm:w-11 sm:h-11 md:w-12 md:h-12"
                    />
                    <div>
                      <h3 className="font-medium text-white text-[14px] sm:text-[16px] md:text-[18px]">
                        {reviews.length > 0 &&
                          reviews[(currentIndex + offset) % reviews.length]
                            ?.user_id}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-white">
                    {reviews.length > 0 &&
                      reviews[(currentIndex + offset) % reviews.length]
                        ?.comment}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <span key={starNum}>
                          {starNum <=
                          reviews[(currentIndex + offset) % reviews.length]
                            ?.rating ? (
                            <MdOutlineStar className="text-[#00B7FF] text-[20px] sm:text-[22px] md:text-[26px]" />
                          ) : (
                            <IoStarOutline className="text-gray-400 text-[20px] sm:text-[22px] md:text-[26px]" />
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-400">
                      {reviews.length > 0 &&
                        reviews[(currentIndex + offset) % reviews.length]
                          ?.created_at}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-[#006AFF] hover:border-[#006AFF] transition-all duration-300"
            >
              ←
            </motion.button>
            <div className="text-white text-[14px] sm:text-[16px] md:text-[18px]">
              {currentIndex + 1} / {reviews.length - 2}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-[#006AFF] hover:border-[#006AFF] transition-all duration-300"
            >
              →
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="mt-6 sm:mt-8 bg-[#006AFF] cursor-pointer text-white px-6 sm:px-8 py-3 rounded-[10px] sm:rounded-[12px] hover:bg-[#0055CC] transition-all duration-300"
          >
            Оставить отзыв
          </motion.button>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <ReviewForm setIsOpen={setIsOpen} foundReview={null} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
