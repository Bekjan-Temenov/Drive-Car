import React, { useEffect, useState } from "react";
import { Review } from "../../../home/ui/Reviews";
import { AppDispatch } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { getReviews } from "../../../home/store/action";
import { MdOutlineStar } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await dispatch(getReviews());
      setReviews(res.payload);
    };
    fetchReviews();
  }, [dispatch]);

  return (
    <div className="p-4 select-none bg-[#0C192E] rounded-[20px] w-full">
      <div className="flex items-center justify-between w-full border-b border-[#D9D9D9]">
        <h1 className="mb-4 text-2xl font-bold text-white">Отзывы</h1>
      </div>

      <div className="max-h-[527px] grid grid-cols-2 justify-between    overflow-y-auto custom-scrollbar scrollbar-hidden">
        
        {reviews.map((reviews, index) => (
          <div
            key={index}
            className="flex items-center  justify-between w-full gap-[20px] my-[20px]"
          >
            <div
              key={reviews.id}
              className="bg-[#1A1C7182] w-[80%] h-[268px] flex flex-col justify-between overflow-y-auto custom-scrollbar   scrollbar-hide rounded-[20px] p-6 relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://yt3.googleusercontent.com/R1vlhyGLOoLp2Ygon20Xm960qKA3nY85fPUB7jRyyjaU3Wl6J2nQCNYrFm8dta1CeuLT-5tP=s900-c-k-c0x00ffffff-no-rj"
                  alt="icon"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-white">{reviews.user_id}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white">
                {reviews.comment}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <span key={starNum}>
                      {starNum <= reviews?.rating ? (
                        <MdOutlineStar className="text-[#00B7FF] text-[26px]" />
                      ) : (
                        <IoStarOutline className="text-gray-400 text-[26px]" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-center text-gray-400 ">
                  {reviews.created_at}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
