import React from 'react';

interface GlobeControlsProps {
  selectedMonth: number | null;
  onMonthChange: (month: number | null) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const GlobeControls: React.FC<GlobeControlsProps> = ({ selectedMonth, onMonthChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onMonthChange(value === "" ? null : parseInt(value, 10));
  };

  return (
    <div className="absolute top-20 left-4 z-20 bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg pointer-events-auto">
      <label htmlFor="month-select" className="block text-xs font-medium text-gray-300 mb-1">
        Show Tournaments In:
      </label>
      <select
        id="month-select"
        value={selectedMonth ?? ""}
        onChange={handleChange}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-green-500 focus:border-green-500 block w-full p-2"
        aria-label="Select month to display tournaments"
      >
        <option value="">-- All Year --</option>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GlobeControls;