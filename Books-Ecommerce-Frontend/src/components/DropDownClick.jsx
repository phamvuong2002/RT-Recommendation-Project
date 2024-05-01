import React, { useState } from 'react';

export const DropDownClick = ({
  icon,
  value,
  setValue,
  titleOption,
  dataOption,
  toggleDropdown,
  isOpen,
  setIsOpen,
  className,
  customButton,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //     setIsOpen(!isOpen);
  // };

  const handleChoice = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-2" onClick={toggleDropdown}>
        <div className="flex">
          {isOpen && (
            <div
              className="absolute mt-10 w-fit shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="filterButton"
              tabIndex="-1"
            >
              {Object.keys(dataOption).map((key) => (
                <button
                  key={key}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => handleChoice(key)}
                >
                  {dataOption[key]}
                </button>
              ))}
            </div>
          )}

          {/* Icon */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg> */}
          {!icon ? '' : icon('w-6 h-6 text-gray-500')}

          <div className="mt-1">{titleOption || ''}</div>
        </div>
        <div>
          <button
            type="button"
            className={
              customButton ||
              'w-full mt-1 font-semibold text-gray-700 hover:bg-gray-50'
            }
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            {dataOption[value]}
          </button>
        </div>
      </div>
    </div>
  );
};
