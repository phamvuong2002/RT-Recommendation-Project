import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const CountDownTimer = ({ flashSaleDay }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = (flashSaleDay - now) / 1000;
      if (distance > 0) {
        const days = Math.floor(distance / 60 / 60 / 24);
        const hours = Math.floor((distance / 60 / 60) % 24);
        const minutes = Math.floor((distance / 60) % 60);
        const seconds = Math.floor(distance % 60);
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [flashSaleDay]);

  return (
    <div className="countdown flex">
      <div className="font-semibold xl:mx-2 mx-1 bg-black text-white py-1 px-2 rounded-lg">
        <p className="grid place-items-center text-sm md:text-lg">
          {days.toString().padStart(2, '0')}
        </p>
      </div>
      <span className="text-sm md:text-xl leading-[140%]">:</span>

      <div className="font-semibold xl:mx-2 mx-1 bg-black text-white py-1 px-2 rounded-lg">
        <p className="grid place-items-center text-sm md:text-lg">
          {hours.toString().padStart(2, '0')}
        </p>
      </div>
      <span className="text-sm md:text-xl leading-[140%]">:</span>

      <div className="font-semibold xl:mx-2 mx-1 bg-black text-white py-1 px-2 rounded-lg">
        <p className="grid place-items-center text-sm md:text-lg">
          {minutes.toString().padStart(2, '0')}
        </p>
      </div>
      <span className="text-sm md:text-xl leading-[140%]">:</span>

      <div className="font-semibold xl:mx-2 mx-1 bg-black text-white py-1 px-2 rounded-lg">
        <p className="grid place-items-center text-sm md:text-lg">
          {seconds.toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};

// Xác định PropTypes cho Product
CountDownTimer.propTypes = {
  flashSaleDay: PropTypes.number.isRequired,
};
