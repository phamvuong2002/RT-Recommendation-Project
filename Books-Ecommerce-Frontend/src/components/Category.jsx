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
        <div className="m-4 md:grid md:justify-items-stretch">
            <div className="flex items-center md:mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffbe98] w-[5%] md:w-[2%]">
                    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
                <div className="text-[90%] md:text-[150%] font-semibold font-['Inter'] tracking-wider">Thể loại ưa chuộng</div>
            </div>

            <div className='px-4 py-2 md:justify-self-center md:w-[90%] md:p-0 md:rounded-none md:bg-transparent md:grid md:grid-cols-[1fr,1.5fr,1fr] md:gap-6'>
                <div className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">1</span>

                    {/* If screen is mobile, </svg> will be hidden. Just show </p> and </div> */}
                    <div className="flex gap-1 rounded-lg bg-[#fda1a194] items-center my-2 p-2 md:block md:my-0 md:p-0">
                        <p className="text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{categoriesTop5.top1}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 block text-[#ff0606] md:hidden">
                            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/9f/11/78/9f11789aeadd48203dd2d3af10d9a57d.jpg"></img>
                </div>

                <div className='hidden md:block w-full border-2 bg-white rounded-md shadow-lg md:px-[12%] lg:px-[20%] md:py-[20%] lg:py-[25%] md:text-2xl lg:text-3xl text-center font-semibold text-indigo-900 capitalize'>Top 5 thể loại được ưa chuộng</div>

                <div className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">2</span>

                    {/* If screen is mobile, </svg> will be hidden. Just show </p> and </div> */}
                    <div className="flex gap-1 rounded-lg bg-[#fda1a194] items-center my-2 p-2 md:block md:my-0 md:p-0">
                        <p className="text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{categoriesTop5.top2}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 block text-[#ff0606] md:hidden">
                            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/90/af/2f/90af2f0ffb3dcbee2fbc87b10d2d98f0.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">3</span>

                    {/* If screen is mobile, </svg> will be hidden. Just show </p> and </div> */}
                    <div className="flex gap-1 rounded-lg bg-[#fda1a194] items-center my-2 p-2 md:block md:my-0 md:p-0">
                        <p className="text-[18px] font-bold md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{categoriesTop5.top3}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 block text-[#ff0606] md:hidden">
                            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <img className="hidden md:block h-full rounded-md" src="https://i.pinimg.com/564x/89/ad/1f/89ad1f413de58358e757b6da8444709f.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">4</span>
                    <p className=" hidden md:block md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{categoriesTop5.top4}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/63/24/97/6324977f3f0c1c0f7ecdb1072e7ded00.jpg"></img>
                </div>

                <div className="md:relative md:text-white font-semibold">
                    <span className="hidden md:block md:absolute md:top-[4%] md:left-[8%] md:text-5xl">5</span>
                    <p className="hidden md:block md:absolute md:bottom-12 md:w-full md:text-center md:text-[20px] lg:text-[28px] md:font-bold">{categoriesTop5.top5}</p>
                    <img className="hidden md:block w-full h-full rounded-md" src="https://i.pinimg.com/564x/47/2d/42/472d4278bc724404d8f3ce18f301af0b.jpg"></img>
                </div>


            </div>
        </div>
    );
}