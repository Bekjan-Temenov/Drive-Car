import React, { useState } from "react";
import { postReview, updateReview } from "../store/action";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { Toaster, toast } from "react-hot-toast";
import { Review } from "./Reviews";

interface ReviewFormProps {
  setIsOpen: (isOpen: boolean) => void;
  foundReview: Review | null;
}

const getUserId = () => {
  let user = localStorage.getItem("user_id");
  if (!user) {
    user = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("user_id", user);
  }
  return user;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ setIsOpen, foundReview }) => {
  const userId = getUserId();
  const [form, setForm] = useState({
    comment: foundReview?.comment || "",
    rating: foundReview?.rating || 0,
    user_id: foundReview?.user_id || userId,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formId = foundReview?.id.toString();
      if (foundReview) {
        await dispatch(updateReview({ form, formId }));
        setIsOpen(false);
        toast.success("Отзыв успешно изменен");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        await dispatch(postReview(form));
        setIsOpen(false);
        toast.success("Отзыв успешно добавлен");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
    }
  };

  return (
    <form
      onSubmit={handleReview}
      className="bg-black rounded-[20px] p-8 w-[600px]"
    >
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-[24px] font-[500]">Что вы думаете ?</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 transition-colors cursor-pointer hover:text-white"
        >
          ✕
        </button>
      </div>
      <p className="text-[#868889] mb-6">Пожалуйста, дайте свою оценку</p>

      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((starNum) => (
          <span
            key={starNum}
            onClick={() => setForm({ ...form, rating: starNum })}
          >
            {starNum <= form.rating ? (
              <MdOutlineStar className="text-[#00B7FF] text-[36px] cursor-pointer" />
            ) : (
              <IoStarOutline className="text-gray-400 text-[36px] cursor-pointer" />
            )}
          </span>
        ))}
      </div>

      <textarea
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        value={form.comment}
        name="text"
        required
        placeholder="Пожалуйста, дайте свою оценку"
        className="w-full h-[150px] text-black bg-white border border-gray-600 rounded-[12px] p-4  placeholder-gray-400 resize-none focus:outline-none focus:border-[#006AFF] transition-colors mb-6"
      />

      <div className="flex items-center justify-between">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-[#006AFF] cursor-pointer text-white px-8 py-3 rounded-[12px] hover:bg-[#0055CC] transition-all duration-300"
        >
          Отправить
        </motion.button>
      </div>
    </form>
  );
};
export default ReviewForm;
