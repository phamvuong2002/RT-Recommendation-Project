// NavigationPath.js
import React from 'react';
// import { Link } from 'react-router-dom';

const NavigationPath = ({ components = [{ path: '/', label: 'Trang Chủ' }] }) => {
    return (
        <div className="px-8">
            <div className="h-8 flex  gap-2 items-center pl-2 text-red-400 text-sm font-normal capitalize tracking-widest bg-white">
                {components.map((component, index) => (
                    <React.Fragment key={index}>
                        <a href={component.path} className={index === components.length - 1 ? "text-zinc-500" : "hover:text-zinc-600"}>
                            {component.label}
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
