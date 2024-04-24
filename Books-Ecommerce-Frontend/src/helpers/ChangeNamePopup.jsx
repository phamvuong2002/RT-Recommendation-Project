import React, { useState, useEffect } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'

//USER SERVICE
import { updateUserInfo } from '../apis/user'
import { fetchAPI } from '../helpers/fetch'
import { AppContext } from '../contexts/main';
import { useContext } from 'react';
export const ChangeNamePopup = ({ open, setOpen, icon = '', fullName = '', setReload }) => {
    const [value, setValue] = useState(fullName)

    // USER SERVICE 
    const { userId, session, setIsLoading } = useContext(AppContext);

    const handleUpdateName = async () => {
        //xử lý update tên
        setIsLoading(true);
        const update = await fetchAPI(`../${updateUserInfo}`, 'POST', {
            updatedField: 'name',
            updatedValue: value,
            userId: userId
        });
        setIsLoading(false);
        setReload(true)
    }


    useEffect(() => {
        setValue(fullName)
    }, [fullName])
    

    return (
        <div>
            <PopupCenterPanel
                open={open}
                setOpen={setOpen}
                titleClassName="hidden"
                contentClassName="mt-0"
                icon={
                    icon
                }
                content={
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center font-semibold">Tên</div>
                        <div className="">
                            <label className="text-gray-400 text-xs" htmlFor="Họ Tên">Họ tên</label>
                            <div className="flex border-b border-gray-200">
                                <input
                                    type="text"
                                    className="w-full h-8 outline-none forcus:outline-none"
                                    value={value}
                                    onChange={(e)=>setValue(e.target.value)}
                                // readOnly
                                />
                                <div className="flex items-center text-gray-400" onClick={() => setValue('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <button className=" w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
                                onClick={handleUpdateName}
                            >
                                Xác nhận
                            </button>
                        </div>

                    </div>
                }
            />
        </div>
    )
}
