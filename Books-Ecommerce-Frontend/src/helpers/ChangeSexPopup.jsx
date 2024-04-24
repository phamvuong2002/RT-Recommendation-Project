import React, { useState } from 'react'
import { PopupCenterPanel } from '../components/popup/PopupCenterPanel'

//USER SERVICE
import {updateUserInfo} from '../apis/user'
import {fetchAPI} from '../helpers/fetch'
import { AppContext } from '../contexts/main';
import { useContext,useEffect } from 'react';

export const ChangeSexPopup = ({ open, setOpen, icon = '', sex = '', setReload }) => {
    const [value, setValue] = useState(sex)

    // USER SERVICE 
    const { userId, session, setIsLoading } = useContext(AppContext);

    const SEXS = [
        { sex: "male", name: "Nam" },
        { sex: "female", name: "Nữ" },
        { sex: "unknown", name: "Khác" }
    ]

    const handleUpdateSex = async () => {
        //xử lý update giới tính
        setIsLoading(true);
        const update = await fetchAPI(`../${updateUserInfo}`, 'POST', {
            updatedField: 'sex',
            updatedValue: value,
            userId: userId
        });
        setIsLoading(false);
        setReload(true)
    }
    useEffect(() => {
        setValue(sex)
    }, [sex])

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
                        <div className="flex items-center justify-center font-semibold">Giới Tính</div>
                        <div className="flex flex-col">
                            <label className="text-gray-400 text-xs" htmlFor="Chọn Giới Tính">Chọn giới tính</label>
                            <div className="mt-4 flex flex-col gap-4">
                                {
                                    SEXS.map((sex) => (
                                        <div key={sex.sex} className="border-b border-gray-200 cursor-pointer hover:bg-red-50" onClick={() => { setValue(sex.sex) }}>
                                            <div className="flex gap-4 items-center px-2 py-1">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 accent-red-500 outline-none forcus:outline-none"
                                                    value={value}
                                                    checked={value === sex.sex}
                                                    readOnly
                                                />
                                                <div className="text-sm">{sex.name}</div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <button className=" w-4/5 h-10 rounded-full text-white font-normal xl:font-semibold xl: text-base bg-gradient-to-r from-pink-500 to-red-500 transition-all xl:hover:from-red-400 xl:hover:to-pink-400"
                                onClick={handleUpdateSex}
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
