import React from "react";
import Container from "../../shared/helpers/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/user/svg/Vector (3).svg";
import telegram from "../../assets/user/svg/Vector (4).svg";
import facebook from "../../assets/user/svg/Vector (5).svg";
import instagram from "../../assets/user/svg/Vector (6).svg";
import twitter from "../../assets/user/svg/Vector (7).svg";

const Footer: React.FC = () => {
  return (
    <footer className=" pt-[50px] relative overflow-hidden">
      <div className="bg-[#649CA9] blur-[180px] absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full"></div>
      <Container>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-bold text-white md:text-xl"
            >
              <img src={logo} alt="" />
              <span className="text-white font-[400]">DriveCar</span>
            </Link>
            <p className="text-white text-[10px] md:text-[14px] w-[120px] md:max-w-[300px] font-[400]">
              Мы предоставляем лучшие автомобили самых известных мировых брендов
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-[400] md:font-[500] text-[12px] md:text-[18px]">Компания</h3>
            <div className="flex flex-col gap-2 md:text-[18px] text-[12px]">
              <Link
                to="/"
                className="text-white hover:text-[#006AFF] transition"
              >
                Главная
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-[#006AFF] transition"
              >
                О компании
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-[#006AFF] transition"
              >
                Услуги
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-[500] text-[12px] md:text-[18px]">
              Наши социальные сети
            </h3>
            <div className="flex items-center gap-4">
              <Link to="https://t.me/drivecar_bot">
                <img
                  className="cursor-pointer w-[15px]  md:w-[24px] h-[15px]  md:h-[24px]"
                  src={telegram}
                  alt="Telegram"
                />
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=61561411434333">
                <img
                  className="cursor-pointer w-[15px]  md:w-[24px] h-[15px]  md:h-[24px]"
                  src={facebook}
                  alt="Facebook"
                />
              </Link>
              <Link to="https://www.instagram.com/drivecar_bot">
                <img
                  className="cursor-pointer w-[15px]  md:w-[24px] h-[15px]  md:h-[24px]"
                  src={instagram}
                  alt="Instagram"
                />
              </Link>
              <Link to="https://twitter.com/drivecar_bot">
              <img
                className="cursor-pointer w-[15px]  md:w-[24px] h-[15px]  md:h-[24px]"
                src={twitter}
                alt="Twitter"
                />
                </Link>
            </div>
          </div>
        </div>

        <div className="mt-[50px] text-center">
          <p className="text-white text-[14px] font-[400]">
            © Bedimcode. All rights reserved
          </p>
        </div>
      </Container>
      <div className="bg-[#649CA9] blur-[180px] absolute bottom-[-190px] right-[-100px] w-[300px] h-[300px] rounded-full"></div>
    </footer>
  );
};

export default Footer;
