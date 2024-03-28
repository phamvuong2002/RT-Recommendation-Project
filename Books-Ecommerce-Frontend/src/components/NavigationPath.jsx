// NavigationPath.js
import React from 'react';
// import { Link } from 'react-router-dom';
import { shortenString } from '../utils/shortenString'
import { isMobileDevice } from '../utils/isMobileDevice'

const NavigationPath = ({ components = [{ path: '/', label: 'Trang Chủ' }] }) => {
    return (
        <div className="px-1 xl:px-8">
            <div className="h-8 flex gap-2 items-center text-red-400 text-xs xl:text-sm font-normal capitalize tracking-widest bg-white">
                {/* {components.map((component, index) => (
                    <React.Fragment key={index}>
                        <a href={component.path} className={index === components.length - 1 ? "text-zinc-500" : "hover:text-zinc-600"}>
                            {component.label}
                        </a>
                        {index !== components.length - 1 && <span className="text-zinc-400"> {'>'} </span>}
                    </React.Fragment>
                ))} */}
                {components.map((component, index) => (
                    <React.Fragment key={index}>
                        <a href={component.path} className={index === components.length - 1 ? "text-zinc-500" : "hover:text-zinc-600"}>
                            {
                                isMobileDevice() ?
                                    shortenString(component.label, 20)
                                    :
                                    component.label
                            }
                        </a>
                        {index !== components.length - 1 && <span className="text-zinc-400"> {'>'} </span>}
                    </React.Fragment>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default NavigationPath;
