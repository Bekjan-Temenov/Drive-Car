import React from "react";
import Container from "../../shared/helpers/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/user/svg/Vector (3).svg";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";

const Header: React.FC = () => {
  const { count } = useSelector((state: RootState) => state.car);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 py-4 bg-black">
      <Container>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <img src={logo} alt="" />
              <span className="text-white font-[400]">DriveCar</span>
            </Link>
          </div>
          <nav className="items-center hidden sm:flex gap-9 md:block">
            <Link
              to="/"
              className="text-white mr-9 hover:text-[#006AFF] hover:underline transition"
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="text-white mr-9 hover:text-[#006AFF] hover:underline   transition"
            >
              О компании
            </Link>
            <Link
              to="/cars"
              className="text-white mr-9 hover:text-[#006AFF] hover:underline  transition"
            >
              Все автомобили
            </Link>
            <Link
              to="/favorites"
              className="text-white mr-9 hover:text-[#006AFF] relative hover:underline  transition"
            >
              <div className="bg-[#006AFF] absolute right-[-9px] top-[-5px] rounded-full px-1 flex items-center justify-center text-white text-xs">
                {count}
              </div>
              Избранное
            </Link>
          </nav>
          <div className="block text-white w-7 h-7 md:hidden">
            {open ? (
              <RiMenuFold4Fill
                onClick={() => setOpen(!open)}
                className="w-full h-full"
              />
            ) : (
              <RiMenuFold3Fill
                onClick={() => setOpen(!open)}
                className="w-full h-full"
              />
            )}
          </div>
          {open && (
            <div className="fixed right-0 top-[50px] flex items-start justify-end bg-black/60 w-full h-full">
              <nav className="flex flex-col px-4 py-2 w-[200px] bg-black gap-9 md:hidden">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-[#006AFF] hover:underline transition"
                >
                  Главная
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/about"
                  className="text-white hover:text-[#006AFF] hover:underline   transition"
                >
                  О компании
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/cars"
                  className="text-white hover:text-[#006AFF] hover:underline  transition"
                >
                  Все автомобили
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/favorites"
                  className="text-white hover:text-[#006AFF] relative hover:underline  transition"
                >
                  <div className="bg-[#006AFF] absolute right-[-9px] top-[-5px] rounded-full px-1 flex items-center justify-center text-white text-xs">
                    {count}
                  </div>
                  Избранное
                </Link>
              </nav>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
