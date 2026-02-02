import React, { useState, useEffect } from "react";
import { Button } from "../../../shared/ui/Button";


const EnterCode: React.FC<{ onConfirm: (code: string) => void }> = ({ onConfirm  }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(code.join(""));
  };


  return (
    <div className="bg-[#111120] w-full relative rounded-[20px] p-8">
      <h2 className="text-[24px] text-center text-white font-medium mb-3">
        Введите 4-значный код
      </h2>
      <p className="text-sm text-center text-white mb-[60px]">
        На адрес электронной почты, который вы указали, должен был прийти
        четырехзначный код.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-4 justify-between gap-[24px]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-full h-12 text-2xl text-black bg-white border rounded"
              style={{ width: "60px", height: "60px", textAlign: "center" }}
              maxLength={1}
            />
          ))}
        </div>

        <Button type="submit" className="w-full">
          Подтвердить
        </Button>

        <div className="text-center">
          <button
            type="button"
            className="text-[#006AFF] text-sm hover:underline"
            disabled={timer > 0}
          >
            Отправить SMS ещё раз {timer > 0 ? `(${timer})` : ""}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnterCode;