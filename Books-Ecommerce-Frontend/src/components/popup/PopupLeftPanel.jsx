import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export const PopupLeftPanel = ({ open, setOpen, icon = '', title = '', content = '' }) => {
    // const [open, setOpen] = useState(false);

    return (
        <>
            {/* button */}
            <div
                type="button"
                onClick={() => setOpen(!open)}
                className={`text-gray-500 hover:text-gray-900 ${icon ? '' : 'hidden'}`}
            >
                {icon}
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden font-inter">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">

                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl ">
                                            {/* Title */}
                                            <div className="p-4">
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

                                            {/* Content */}
                                            {
                                                content
                                            }
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
