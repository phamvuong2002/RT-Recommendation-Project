import React from 'react'

export const TextLoader = ({ items }) => {
    // Tạo một mảng chứa các phần tử loader dựa trên giá trị của items
    const loaders = Array.from({ length: items }, (_, index) => index);

    return (
        <div className="flex flex-col gap-4 w-full">
            {loaders.map(index => (
                <div key={index} className="animate-pulse flex">
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
    )
}


