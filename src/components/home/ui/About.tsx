import React from "react";
import Container from "../../../shared/helpers/Container";

const About: React.FC = () => {
  const advantages = [
    {
      id: 1,
      title: "Высокий стандарт безопасности",
      description:
        "Высокий стандарт безопасности: наш автомобиль оснащен передовыми системами безопасности, включая адаптивный круиз-контроль, систему предупреждения столкновений и автоматическое торможение. Все эти функции были тщательно разработаны для обеспечения максимальной защиты водителя и пассажиров, что делает наш автомобиль надежным выбором для семьи.",
      image:
        "https://static.theceomagazine.net/wp-content/uploads/2019/12/12082634/aston-valhalla.jpg",
    },
    {
      id: 2,
      title: "Надежность и долговечность",
      description:
        "Благодаря высококачественным материалам и инженерным решениям, наш автомобиль прослужит долгие годы. Мы уверены в его надежности, поэтому предоставляем расширенную гарантию и поддержку, что подтверждает наше доверие к качеству продукта.",
      image:
        "https://www.topgear.com/sites/default/files/images/news-article/2018/10/05714073df3a533bb3118008843cc5f7/front_3_4_a.jpg?w=1280&h=720",
    },
    {
      id: 3,
      title: "Положительные отзывы и репутация",
      description:
        "Наш автомобиль уже заслужил признание на рынке. Сотни довольных клиентов и экспертами оценили. Люди доверяют нашему бренду за его приверженность качеству и удовлетворению потребностей клиентов.",
      image:
        "https://m.atcdn.co.uk/ect/media/w600/cc30ff750861454ca2704ba42c265706.jpg",
    },
  ];

  return (
    <section className="md:py-20">
      <Container>
        <div className="space-y-10 sm:space-y-14 md:space-y-20">
          {advantages.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-center gap-6  lg:gap-20 ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full sm:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover rounded-[10px] sm:rounded-[15px] md:rounded-[20px]"
                />
              </div>

              <div className="w-full space-y-3 sm:w-1/2 sm:space-y-4">
                <h2 className="text-white text-[16px] sm:text-[20px] md:text-[32px] font-medium">
                  {item.title}
                </h2>
                <p className="leading-relaxed text-gray-400 text-[12px] sm:text-[14px] md:text-[16px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default About;
