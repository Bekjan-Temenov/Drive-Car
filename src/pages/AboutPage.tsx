import React from "react";
import Container from "../shared/helpers/Container";

const AboutPage: React.FC = () => {
  return (
    <Container>
      <div className="py-10 text-white ">
      <div className="text-white  gap-[31px] flex items-center   ">
          <hr className="border-[#FFFFFF80] w-full h-[2px] rounded-full" />
          <h1 className="text-[35px] font-[500] whitespace-nowrap">
            О компании
          </h1>
          <hr className="border-[#FFFFFF80]  w-full h-[2px] rounded-full" />
        </div>
        <div className="   md:p-8 space-y-6 md:mx-[6%]">
          <div>
            <h2 className="text-[22px] font-[400] ">
              Добро пожаловать в "Bishkek AUTO" Авторынок - это онлайн
              авторынок, где собрана подробная информация о подержанных и новых
              машинах, ценах и доступных комплектациях. У нас вы сможете
              подобрать легковые автомобили с пробегом, новые, на обмен и в
              рассрочку! Продажа авто в Бишкеке с фото, в рассрочку и дешево.
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-[18px] font-[500] mb-2">Контакты:</h3>
              <p className="text-gray-400">Телефон: +996 XXX XXX XXX</p>
              <p className="text-gray-400">Email: info@bishkekauto.kg</p>
            </div>

            <div>
              <h3 className="text-[18px] font-[500] mb-2">Адрес:</h3>
              <p className="text-gray-400">г. Бишкек, ул. Ленина, д. 123</p>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-[500] mb-2">С уважением,</h3>
            <p className="text-gray-400">Команда "Bishkek AUTO"</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
