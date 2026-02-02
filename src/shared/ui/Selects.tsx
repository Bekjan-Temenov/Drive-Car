import React from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, onChange }) => {
  return (
    <select
      className="p-2 text-white bg-[#131313] border border-[#BEBEBE] rounded-[8px]"
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;