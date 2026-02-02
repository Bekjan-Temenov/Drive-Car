import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[] ;
  placeholder?: string;
  onChange: (selectedValues: string[]) => void;
 
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, placeholder, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    setSelectedValues((prev) => {
      const newValues = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onChange(newValues);
      return newValues;
    });
  };

  const CustomCheckbox = ({ checked }: { checked: boolean }) => (
    <div className="relative w-5 h-5 border-2  border-[#006AFF] rounded-[4px] flex items-center justify-center">
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-3 h-3 bg-[#006AFF] rounded-[2px]"
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative">
      <div
        className="flex justify-between items-center cursor-pointer border border-[#D9D9D9] rounded-[8px] p-2 bg-[#131313] text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[#FFFFFF]/72">{selectedValues.length > 0 ? `Выбрано: ${selectedValues.length}` : placeholder}</span>
        <span className="material-icons">{isOpen ? <FaChevronUp/> : <FaChevronDown/>}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#131313] border border-[#D9D9D9] rounded-[8px] max-h-60 overflow-y-auto custom-scrollbar scrollbar-hidden">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#1E2832]">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="hidden"
                />
              <CustomCheckbox
                checked={selectedValues.includes(option.value)}
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect; 