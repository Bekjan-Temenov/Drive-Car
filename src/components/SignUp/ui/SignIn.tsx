import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { signIn } from "../store/action";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

const signInSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInProps {
  onSwitch: () => void;
  onForgot: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch, onForgot }) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      dispatch(signIn({ email: data.email, password: data.password }));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
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

        <div className="flex items-center justify-between">
          <Checkbox label="Запомнить" {...register("remember")} />
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Войти
        </Button>

        <div className="text-center">
          <p className="text-[#6B7280] text-sm">
            Нет аккаунта?{" "}
            <button
              onClick={onSwitch}
              className="text-[#006AFF] hover:underline"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
        <button
          onClick={onForgot}
          className="text-[#006AFF] text-sm hover:underline"
        >
          Забыли пароль?
        </button>
      </form>
    </div>
  );
};

export default SignIn;
