import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/main';

export const ProgressLoading = () => {
    const { isProgressLoading } = useContext(AppContext);
    const [progress, setProgress] = useState(0);
    const [isShow, setIsShow] = useState(isProgressLoading);

    useEffect(() => {
        let intervalId;
        if (isShow) {
            intervalId = setInterval(() => {
                setProgress(prevProgress => {
                if (prevProgress < 50) return 50;
                if (prevProgress < 75) return 75;
                return prevProgress;
                });
            }, 500);
        } else {
            setTimeout(() => {
                setProgress(100);
            }, 2000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isShow]);

    useEffect(() => {
        setIsShow(isProgressLoading)
    }, [isProgressLoading])


    return isShow ? (
        <div className='loading h-1 bg-blue-500 shawdow shadow-lg transition-all duration-200 fixed z-40 top-0' style={{ width: `${progress}%` }}>
        </div>
    ) : null;
};
