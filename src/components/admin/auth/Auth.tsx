import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { signIn } from "./store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { Link } from "react-router-dom";
import logo from "../../../assets/user/svg/Vector (3).svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import car from "../../../assets/user/img/image 47.png";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await dispatch(
        signIn({ email: data.email, password: data.password })
      );

      if (res?.payload?.token) {
        localStorage.setItem("admin-token", res.payload.token);
        navigate("/admin");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      navigate("/admin/sign-in");
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

        <div className="bg-[#111120] w-full relative rounded-[20px] p-8">
          <h2 className="text-[24px] text-center text-white font-medium mb-3">
            Вход в аккаунт
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email*"
              error={errors.email?.message}
            />

            <Input
              {...register("password")}
              type="password"
              placeholder="Пароль*"
              error={errors.password?.message}
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full cursor-pointer"
            >
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
