import React, { useRef, useState } from 'react';
import { SliderProducts } from './SliderProducts';
import { CountDownTimer } from './CountdownTimer';
import PropTypes from 'prop-types';

export const FlashSale = () => {
  const flashSaleDay = new Date('July 15, 2024').getTime();
  return (
    <div className="flex gap-1 items-center">
      <div className="text-base font-semibold xl:block hidden xl:w-full">
        Kết thúc trong:{' '}
      </div>
      <div className="relative w-[80%] xl-">
        <CountDownTimer flashSaleDay={flashSaleDay} />
      </div>
    </div>
  );
};
