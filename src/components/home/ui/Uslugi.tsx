import React from "react";
import Container from "../../../shared/helpers/Container";
import icon from "../../../assets/user/svg/Vector (3).svg";
import bg from "../../../assets/user/img/Logo.png";

const Uslugi: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Оценка автомобиля",
      icon: icon,
    },
    {
      id: 2,
      title: "Подготовка к продаже",
      icon: icon,
    },
    {
      id: 3,
      title: "Комиссионная продажа",
      icon: icon,
    },
    {
      id: 4,
      title: "Консультация по рынку",
      icon: icon,
    },
    {
      id: 5,
      title: "Трейд - ин",
      subtitle: "Обмен старого автомобиля на новый ",
      icon: icon,
    },
    {
      id: 6,
      title: "Фотосъемка и создание объявления",
      icon: icon,
    },
  ];

  return (
    <section className="relative py-[20px] md:py-20">
      <Container>
        <div className="flex items-center justify-center">
          <img
            className="absolute top-[-30px]  w-[600px] h-[420px] object-cover"
            src={bg}
            alt=""
          />
        </div>
        <h2 className="text-center text-white text-[32px] font-[500] mb-16">
          НАШИ УСЛУГИ
        </h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="border relative border-gray-700 rounded-[18px] p-0 md:p-6 flex-col  gap-4  transition-all h-[140px] flex items-center justify-center cursor-pointer group bg-[#FFFFFF1A]/90 "
            >
              <img
                className=" absolute top-[-30px] w-[64px] h-[64px]"
                src={service.icon}
                alt=""
              />
              <h3 className="text-sm font-medium text-center text-white md:text-lg">
                {service.title}
              </h3>
              {service.subtitle && (
                <p className="text-xs text-center text-gray-400">
                  {service.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Uslugi;
