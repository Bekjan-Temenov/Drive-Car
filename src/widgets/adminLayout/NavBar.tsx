import React from "react";
import { FaSearch } from "react-icons/fa"; // Иконка пользователя

const NavBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center w-full max-w-[600px]">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Поиск"
            className="w-full bg-transparent border border-[#EBEBEB] rounded-[20px] pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none"
          />
          <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-white">Администратор</span>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' alt="User" className="w-8 h-8 p-1 border rounded-full" />
      </div>
    </div>
  );
};

export default NavBar;
