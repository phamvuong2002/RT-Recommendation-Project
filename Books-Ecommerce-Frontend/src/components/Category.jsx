import React, { useRef, useState } from 'react';

export const Category = () => {
    const categoriesTop5 = {
        top1: "Manga - Comic",
        top2: "Sách nước ngoài",
        top3: "Văn học Việt Nam",
        top4: "Sách giáo khoa",
        top5: "Tiểu thuyết",
    }
    return (
        <div className="m-4">
            <div className='md:grid md:grid-cols-[1fr,1.5fr,1fr] md:gap-6'>
                <div className="md:relative md:text-white font-semibold">
                    <span className="md:absolute md:top-[4%] md:left-[8%] md:text-5xl">1</span>
                    <p className="md:absolute md:bottom-12 md:w-full md:text-center">{categoriesTop5.top1}</p>
                    <img className="hidden md:block w-full h-full object-cover rounded-md" src="https://i.pinimg.com/564x/66/dc/ca/66dcca5a43bc51a2d669fa4782618c12.jpg"></img>
                </div>

                <div className='hidden md:block border-2 rounded-md shadow-lg md:px-[12%] lg:px-[20%] md:py-[20%] lg:py-[25%] md:text-2xl lg:text-3xl text-center font-semibold text-indigo-900 capitalize'>Top 5 thể loại được ưa chuộng</div>

                <div className="md:relative md:text-white font-semibold">
                    <span className=" md:absolute md:top-[4%] md:left-[8%] md:text-5xl">2</span>
                    <p className=" md:absolute md:bottom-12 md:w-full md:text-center">{categoriesTop5.top2}</p>
                    <img className="hidden md:block w-full h-full object-cover rounded-md" src="https://i.pinimg.com/564x/90/af/2f/90af2f0ffb3dcbee2fbc87b10d2d98f0.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className=" md:absolute md:top-[4%] md:left-[8%] md:text-5xl">3</span>
                    <p className="md:absolute md:bottom-12 md:w-full md:text-center">{categoriesTop5.top3}</p>
                    <img className="hidden md:block w-full md:max-h-[323px] object-cover rounded-md" src="https://i.pinimg.com/564x/89/ad/1f/89ad1f413de58358e757b6da8444709f.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className=" md:absolute md:top-[4%] md:left-[8%] md:text-5xl">4</span>
                    <p className=" md:absolute md:bottom-12 md:w-full md:text-center">{categoriesTop5.top4}</p>
                    <img className="hidden md:block w-full md:max-h-[323px] object-cover rounded-md" src="https://i.pinimg.com/564x/63/24/97/6324977f3f0c1c0f7ecdb1072e7ded00.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className=" md:absolute md:top-[4%] md:left-[8%] md:text-5xl">5</span>
                    <p className=" md:absolute md:bottom-12 md:w-full md:text-center">{categoriesTop5.top5}</p>
                    <img className="hidden md:block w-full md:max-h-[323px] object-cover rounded-md" src="https://i.pinimg.com/564x/47/2d/42/472d4278bc724404d8f3ce18f301af0b.jpg"></img>
                </div>
            </div>
        </div >
    );
}
