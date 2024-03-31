import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const PopupCenterPanel = ({ open, setOpen, icon = '', title = '', content = '', titleClassName = 'p-4' }) => {
    return (
        <>
            <div
                type="button"
                onClick={() => setOpen(!open)}
                className={`text-gray-500 hover:text-gray-900 ${icon ? '' : 'hidden'} cursor-pointer`}
            >
                {icon}
            </div>
            <Transition.Root show={open} as={Fragment} >
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-20 " onClose={() => { setOpen(false) }}>
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
                                <div>
                                    {/* Title */}
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        <div className={titleClassName}>
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    {title}
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute " />
                                                        <span className="sr-only">Close panel</span>
                                                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>

                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Title>

                                    {/* Content */}
                                    <div className="mt-2">
                                        {content}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};


