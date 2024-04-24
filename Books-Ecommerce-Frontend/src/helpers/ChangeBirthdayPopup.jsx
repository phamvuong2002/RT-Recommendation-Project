import React, { useState } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'


//USER SERVICE
import { updateUserInfo } from '../apis/user'
import { fetchAPI } from '../helpers/fetch'
import { AppContext } from '../contexts/main';
import { useContext, useEffect } from 'react';

export const ChangeBirthdayPopup = ({ open, setOpen, icon = '', birthday = '', setReload }) => {
    const [value, setValue] = useState(birthday)
    // USER SERVICE 
    const { userId, session, setIsLoading } = useContext(AppContext);

    const handleUpdateBirthday = async () => {
        //xử lý update Ngày sinh
        console.log(value)
        setIsLoading(true);
        const update = await fetchAPI(`../${updateUserInfo}`, 'POST', {
            updatedField: 'dob',
            updatedValue: value,
            userId: userId
        });
     
        setIsLoading(false);
        setReload(true)
    }

    // useEffect(() => {
    //     setValue(birthday)
    // }, [birthday])

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
                        <div className="flex items-center justify-center font-semibold">Ngày Sinh</div>
                        <div className="flex flex-col">
                            <label className="text-gray-400 text-xs" htmlFor="Chọn Ngày Sinh">Chọn ngày sinh</label>
                            <div className="mt-4 flex flex-col gap-4">
                                <div className="relative max-w-sm">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input type="date" className="bg-gray-50 border outline-none focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" 
                                    value={value}
                                    onChange={(e)=>setValue(e.target.value)}/>   
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <button className=" w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
                                onClick={handleUpdateBirthday}
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
