import React from "react";
import logo from "../../assets/user/svg/ЛОГО.svg";
import bg from "../../assets/user/img/image 10.png";
import summary from "../../assets/admin/svg/Group (2).svg";
import myCars from "../../assets/admin/svg/dollar-square.svg";
import announcements from "../../assets/admin/svg/Group (3).svg";
import content from "../../assets/admin/svg/fluent_content-view-16-regular.svg";
import exit from "../../assets/admin/svg/Vector (9).svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: myCars, label: "Мои машины", path: "/admin" },
  { icon: announcements, label: "Объявления", path: "/admin/advertisements" },
  { icon: content, label: "Отзывы", path: "/admin/reviews" },
  { icon: summary, label: "Статистика", path: "/admin/content" },
];

const NavButton: React.FC<NavItem> = ({ icon, label, path }) => (
  <Link
    className="flex items-center gap-[12px] w-full pl-[15px] py-[8px] cursor-pointer rounded-[8px] border border-white text-white font-[700] text-[20px] hover:bg-white hover:text-black group"
    to={path}
  >
    <img
      src={icon}
      alt=""
      className="brightness-0 invert group-hover:invert-0"
    />
    {label}
  </Link>
);

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
      }}
      className="flex py-[34px] flex-col bg-cover bg-center gap-[100px] items-center justify-between px-[25px] h-screen w-[27%]"
    >
      <img src={logo} alt="logo" />

      <div className="flex flex-col items-center w-full gap-[31px]">
        {navItems.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>

      <button
        onClick={Logout}
        className="flex items-center gap-[12px] w-full pl-[15px] py-[8px] cursor-pointer rounded-[8px] border border-white text-white font-[700] text-[20px] hover:bg-white hover:text-black group"
      >
        <img
          src={exit}
          alt=""
          className="brightness-0 invert group-hover:invert-0"
        />
        Выйти
      </button>
    </div>
  );
};

export default SideBar;
