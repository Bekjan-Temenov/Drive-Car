import React from 'react';

interface YearSelectProps {
  selectedYear: string | null;
  onChange: (year: string) => void;
}

const YearSelect: React.FC<YearSelectProps> = ({ selectedYear, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, index) => currentYear - index);

  return (
    <select
      value={selectedYear || ''}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 text-white bg-[#131313] border border-[#BEBEBE] scrollbar-hidden custom-scrollbar rounded-[8px]"
    >
      <option className="text-[#FFFFFF]/72"  disabled>
        Выберите год 
      </option>
      {years.map((year) => (
        <option  key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect; 