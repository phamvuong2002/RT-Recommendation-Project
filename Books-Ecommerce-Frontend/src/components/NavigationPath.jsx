// NavigationPath.js
import React from 'react';
// import { Link } from 'react-router-dom';
import { shortenString } from '../utils/shortenString';
import { isMobileDevice } from '../utils/isMobileDevice';
import { Link } from 'react-router-dom';

const NavigationPath = ({
  components = [{ path: '/', label: 'Trang Chủ' }],
}) => {
  return (
    <div className="px-1 xl:px-8 bg-white">
      <div className="h-8 flex gap-2 items-center text-red-400 text-xs xl:text-sm font-normal capitalize tracking-widest bg-white">
        {components.map((component, index) =>
          component.path === '#' ? (
            <React.Fragment key={index}>
              <div
                className={
                  index === components.length - 1
                    ? 'text-zinc-500'
                    : 'hover:text-zinc-600'
                }
              >
                {' '}
                {isMobileDevice()
                  ? shortenString(component.label, 20)
                  : component.label}{' '}
              </div>
              {index !== components.length - 1 && (
                <span className="text-zinc-400"> {'>'} </span>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <Link
                to={component.path}
                className={
                  index === components.length - 1
                    ? 'text-zinc-500'
                    : 'hover:text-zinc-600'
                }
              >
                {isMobileDevice()
                  ? shortenString(component.label, 20)
                  : component.label}
              </Link>
              {index !== components.length - 1 && (
                <span className="text-zinc-400"> {'>'} </span>
              )}
            </React.Fragment>
          ),
        )}
      </div>
      <hr />
    </div>
  );
};

export default NavigationPath;
