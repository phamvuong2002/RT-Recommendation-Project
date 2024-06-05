import React from 'react';

export const CartLoader = ({ items }) => {
  // Tạo một mảng chứa các phần tử loader dựa trên giá trị của items
  const loaders = Array.from({ length: items }, (_, index) => index);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-10 p-2 mx-auto">
      {loaders.map((index) => (
        <div key={index} className="shadow rounded-md px-6 py-4 bg-white">
          <div className="animate-pulse flex flex-col">
            <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-red-300">
              <img
                src="https://res.cloudinary.com/datpm13gx/image/upload/v1717062072/bookada_pattern_ln2orl.png"
                alt="pattern"
                className="h-full blur-sm"
              />
            </div>
            <div className="flex-1  space-y-6 py-1">
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
        </div>
      ))}
    </div>
  );
};
