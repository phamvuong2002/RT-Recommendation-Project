// NavigationPath.js
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { shortenString } from '../utils/shortenString';
import { isMobileDevice } from '../utils/isMobileDevice';
import { Link } from 'react-router-dom';

const NavigationPath = ({
  components = [{ path: '/', label: 'Trang Chủ' }],
}) => {
  const [paths, setPaths] = useState(components);

  useEffect(() => {
    setPaths(components);
  }, [components]);

  return (
    <div className="px-1 xl:px-8 bg-white">
      <div className="h-8 flex gap-2 items-center text-red-400 text-xs xl:text-sm font-normal capitalize tracking-widest bg-white">
        {!paths
          ? ''
          : paths.map((path, index) =>
              path.path === '#' ? (
                <React.Fragment key={index}>
                  <div
                    className={
                      index === path.length - 1
                        ? 'text-zinc-500'
                        : 'hover:text-zinc-600'
                    }
                  >
                    {' '}
                    {isMobileDevice()
                      ? shortenString(path.label, 20)
                      : path.label}{' '}
                  </div>
                  {index !== paths.length - 1 && (
                    <span className="text-zinc-400"> {'>'} </span>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <Link
                    to={path.path}
                    className={
                      index === paths.length - 1
                        ? 'text-zinc-500'
                        : 'hover:text-zinc-600'
                    }
                  >
                    {isMobileDevice()
                      ? shortenString(path.label, 20)
                      : path.label}
                  </Link>
                  {index !== paths.length - 1 && (
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
