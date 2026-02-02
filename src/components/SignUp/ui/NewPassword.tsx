import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";

const NewPassword: React.FC<{ onSwitch: () => void; token: any }> = ({ onSwitch }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetLoading, resetError } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.error("Пароли не совпадают");
      return;
    }

    
  };

  return (
    <div className="bg-[#111120] w-full relative rounded-[20px] p-8">
      <h2 className="text-[24px] text-center text-white font-medium mb-3">Установите новый пароль</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Новый пароль*"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Подтвердите новый пароль*"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" isLoading={resetLoading} className="w-full">
          Установить новый пароль
        </Button>

        {resetError && <p className="text-red-500">{resetError}</p>}

        <div className="text-center">
          <button onClick={onSwitch} className="text-[#006AFF] text-sm hover:underline">
            Вернуться к входу
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;