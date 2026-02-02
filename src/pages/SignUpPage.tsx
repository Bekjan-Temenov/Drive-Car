import React, { useState } from "react";
import logo from "../assets/user/svg/Vector (3).svg";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import car from "../assets/user/img/image 47.png";
import SignUp from "../components/SignUp/ui/SignUp";
import SignIn from "../components/SignUp/ui/SignIn";
import ForgotPassword from "../components/SignUp/ui/ForgotPassword";

type FormType = "signUp" | "signIn" | "forgotPassword";

const SignUpPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormType>("signUp");

  const renderForm = () => {
    switch (currentForm) {
      case "signUp":
        return <SignUp onSwitch={() => setCurrentForm("signIn")} />;
      case "signIn":
        return (
          <SignIn
            onSwitch={() => setCurrentForm("signUp")}
            onForgot={() => setCurrentForm("forgotPassword")}
          />
        );
      case "forgotPassword":
        return <ForgotPassword onSwitch={() => setCurrentForm("signIn")} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <img className="absolute z-0 w-full h-auto" src={car} alt="" />
      <div className="bg-[#111120] relative w-[39%] rounded-[20px] p-8">
        <Link to="/">
          <FaArrowLeftLong className="text-white w-[36px] h-[36px] cursor-pointer" />
        </Link>
        <Link
          to="/"
          className="absolute top-[-60px] w-full left-[37%] z-50 flex items-center gap-2 mb-6"
        >
          <img src={logo} alt="logo" className="w-[138px] h-[138px]" />
        </Link>
        <div>{renderForm()}</div>
      </div>
    </div>
  );
};

export default SignUpPage;
