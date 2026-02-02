import React from "react";
import Container from "../shared/helpers/Container";
import { Link } from "react-router-dom";
import logo from "../assets/user/svg/Vector (3).svg";
import notFound from "../assets/admin/img/Снимок экрана 2025-02-15 223500.png";
import '../app/index.css'

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-[100px] h-[90%] my-[5%] py-[5%] px-[6%] text-white bg-transparent border border-white rounded-[30px]">
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <img src={logo} alt="" />
              <span className="text-white font-[500]">DriveCar</span>
            </Link>
          </div>
          <div className="flex items-center gap-9">
            <Link to="/cars">
              <label className="text-white hover:text-[#006AFF] hover:underline transition">
                Услуги
              </label>
            </Link>
            <Link to="/about">
              <label className="text-white hover:text-[#006AFF] hover:underline transition">
                О Нас
              </label>
            </Link>
            <Link to="/favorites">
              <label className="text-white hover:text-[#006AFF] hover:underline transition">
                Избранное
              </label>
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-5">
          <h1 className="glitch ">404</h1>
            <p
              className="text-sm text-white"
            >
              Упс! Вы попали не тупиковую страницу
            </p>
            <Link to="/">
              <button
                className="text-red-700 cursor-pointer border border-white px-7 py-2 font-[500] hover:bg-red-600 hover:text-white transition"
                
              >
                Давайте вернемся на главную!
              </button>
            </Link>
          </div>
          <img
            src={notFound}
            alt="Not Found"
            className="w-[700px] h-auto"
          />
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
