import React from 'react';

export const ShoppingCartLoader = ({ items }) => {
  // Tạo một mảng chứa các phần tử loader dựa trên giá trị của items
  const loaders = Array.from({ length: items }, (_, index) => index);

  return (
    <div className="flex flex-col gap-4 shadow rounded-md p-4 w-full mx-auto bg-white">
      {loaders.map((index) => (
        <div key={index} className="animate-pulse flex space-x-4">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-red-300"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
