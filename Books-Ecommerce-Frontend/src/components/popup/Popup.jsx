import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const Popup = ({ autoShow = false, autoClose = 0, icon = null, onYesClick, onNoClick, Title = '', Content, Option, CustomClassName, ErrorHandling, SuccessHandling }) => {
    const [open, setOpen] = useState(autoShow);
    const [loading, setLoading] = useState(false);
    const [customContent, setCustomContent] = useState('');
    const [reload, setReload] = useState(false);

    const TIMEOUT = 2000;

    const generateContent = (CustomClass, Title, Content) => {
        return (
            <div className={CustomClass || ''}>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {Title}
                </Dialog.Title>
                <div className="mt-2">
                    {Content ? (
                        typeof Content === 'function' ? <Content /> : Content
                    ) : (
                        <p className="text-sm text-gray-500">
                            Do you want to proceed?
                        </p>
                    )}
                </div>
            </div>
        )
    }


    const handleYesClick = async () => {
        setLoading(true);
        const result = await onYesClick();
        console.log(result);
        //Success
        if (result === 'success') {
            if (SuccessHandling) setCustomContent(handleSuccess);
            setOpen(false)
            setLoading(false);
        }
        else {
            // Error
            if (ErrorHandling) setCustomContent(handleError);
            setLoading(false);
        }
    };

    const handleNoClick = async () => {
        onNoClick();
        setReload(!reload);
        setLoading(false);
    }

    //Success handling
    const handleSuccess = () => {
        setTimeout(() => {
            setReload(true);
            setOpen(false);
        }, TIMEOUT)
        return generateContent(
            CustomClassName,
            SuccessHandling?.title || "Xử lý thành công!",
            SuccessHandling?.message || "Yêu cầu của bạn đã được xử lý thành công!"
        )
    }

    //Error handling
    const handleError = () => {
        setTimeout(() => {
            setReload(true);
            setOpen(false);
        }, TIMEOUT)
        return generateContent(
            CustomClassName,
            ErrorHandling?.title || "Lỗi xử lý",
            ErrorHandling?.message || "Có một vài sự cố khi xử lý. Vui lòng thử lại sau!"
        )
    }

    // Cài đặt popup cho lần đầu
    useEffect(() => {
        //Auto Close
        if (autoClose) {
            setTimeout(() => {
                setOpen(false);
            }, autoClose);
        }

        //Set Customize Contents
        setCustomContent(generateContent(CustomClassName, Title, Content))
    }, [reload])


    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`text-gray-500 hover:text-gray-900 ${icon ? '' : 'hidden'}`}
            >
                {icon}
            </button>
            <Transition.Root show={open} as={Fragment} >
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-20 " onClose={() => { handleNoClick(); setOpen(false) }}>
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                            {/* <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" /> */}

                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4"
                            enterTo="opacity-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-4"
                        >
                            <div className="bg-gray-50 inline-block align-middle px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                                {customContent}

                                <div className={`mt-5 flex justify-between ${Option ? '' : 'hidden'}`}>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-1/2 border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700"
                                        // onClick={() => {
                                        //     setOpen(false);
                                        //     onYesClick();
                                        // }}
                                        onClick={handleYesClick}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : Option?.yes} {/* Hiển thị "Loading" khi đang fetch, ngược lại hiển thị label của nút */}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-1/2 border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-700 hover:bg-gray-400"
                                        onClick={() => {
                                            setOpen(false);
                                            handleNoClick();
                                        }}
                                    >
                                        {Option?.no}
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};


