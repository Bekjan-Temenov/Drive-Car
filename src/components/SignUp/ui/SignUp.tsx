import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { useDispatch } from "react-redux";
import { signUp } from "../store/action";
import { AppDispatch } from "../../../app/store"

const signUpSchema = z.object({
  fullName: z.string().min(2, "ФИО должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: z.string(),
  remember: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpProps {
  onSwitch: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch }) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });



  const onSubmit = async (data: SignUpFormData) => {
    try {
      await dispatch(signUp({username: data.fullName,email: data.email,password: data.password})
      );
    } catch (error) {
      console.error("Registration error:", error);
    }
  };


  return (
    <div className="bg-[#111120] relative w-full rounded-[20px] p-8">
      <h2 className="text-[24px] text-center text-white font-medium mb-3">
        Регистрация
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("fullName")}
          type="text"
          name="fullName"
          placeholder="ФИО*"
          error={errors.fullName?.message}
        />

        <Input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email*"
          error={errors.email?.message}
        />

        <Input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Пароль*"
          error={errors.password?.message}
        />

        <Input
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль*"
          error={errors.confirmPassword?.message}
        />

        <Checkbox
          label="Запомнить"
          {...register("remember")}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
        >
          Регистрация
        </Button>

        <div className="text-center">
          <p className="text-[#6B7280] text-sm">
            Уже есть аккаунт?{" "}
            <button onClick={onSwitch} className="text-[#006AFF] cursor-pointer hover:underline">
              Войти
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

