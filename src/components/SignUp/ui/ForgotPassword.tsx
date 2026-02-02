import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { resetPassword } from "../store/action";
import EnterCode from "./EnterCode";
import NewPassword from "./NewPassword"; 
import { verifyResetCode } from "../store/action";

interface ForgotPasswordProps {
  onSwitch: () => void;
}

const forgotSchema = z.object({
  email: z.string().email("Некорректный email"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSwitch }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [token, setToken] = useState<any>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
        

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { resetError, resetLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit = async (data: ForgotFormData) => {
    const response = await dispatch(resetPassword(data.email));
    if (response.payload) {
      setToken(response.payload.token);
      setIsCodeSent(true);
    }
  };

  const handleCodeConfirm = async (code: string) => {
    const verificationResponse = await dispatch(verifyResetCode({ token, code }));
    
    if (verificationResponse.meta.requestStatus === 'fulfilled') {
      setRefreshToken(verificationResponse.payload.access_token);
      setIsCodeVerified(true);
    } else {
      console.error("Ошибка верификации кода");
    }
  };

  return (
    <div className="bg-[#111120] w-full relative rounded-[20px] p-8">
      {!isCodeSent ? (
        <>
          <h2 className="text-[24px] text-center text-white font-medium mb-3">
            Восстановление пароля
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email*"
              error={errors.email?.message}
            />

            <Button type="submit" isLoading={resetLoading} className="w-full">
              Отправить
            </Button>

            <div className="text-center">
              <button
                onClick={onSwitch}
                className="text-[#006AFF] text-sm hover:underline"
              >
                Вернуться к входу
              </button>
            </div>

            {resetError && (
              <p className="text-red-500">
                {typeof resetError === "string"
                  ? resetError
                  : resetError || "Произошла ошибка"}
              </p>
            )}
          </form>
        </>
      ) : isCodeVerified ? (
        <NewPassword onSwitch={onSwitch} token={refreshToken} />
      ) : (
        <EnterCode onConfirm={handleCodeConfirm}  />
      )}
    </div>
  );
};

export default ForgotPassword;