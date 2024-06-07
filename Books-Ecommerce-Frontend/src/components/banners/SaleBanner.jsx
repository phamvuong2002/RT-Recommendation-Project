import React from 'react';
import './saleBanner.css';

export const SaleBanner = () => {
  return (
    <div className="body-sale-banner">
      <div className="container-sale-banner">
        <a className="box box--1">
          <div className="box__background">
            <div className="box__text-line box__text-line--top">
              <span>Nhanh Tay Sách Hay</span>
            </div>
            <div className="box__text-line box__text-line--bottom">
              <span>Siêu Sale Cuối Tuần</span>
            </div>
          </div>
          <div className="box__content">
            <div className="box__col">
              <div className="box__title">
                Thứ 7 <span>siêu sale</span>
              </div>
              <div className="box__btn">shop now</div>
            </div>
            <div className="box__col">
              <div className="box__card card">
                <div className="card__top">20.6 - 22.6</div>
                <div className="card__title">
                  <span>15%</span> Sách Thiếu Nhi
                </div>
                <div className="card__btn">Xem Thêm</div>
              </div>
              <div className="box__card card">
                <div className="card__top">25 Tháng 6</div>
                <div className="card__title">
                  <span>35%</span> Sách Giáo Khoa
                </div>
                <div className="card__btn">Xem Thêm</div>
              </div>
            </div>
          </div>
        </a>
        <a className="box box--2">
          <svg
            className="box__background"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="line1"
              d="M251.994 21.5L251.995 190.5C251.995 212.591 269.903 230.5 291.995 230.5L517.5 230.5C539.592 230.5 557.5 248.409 557.5 270.5L557.5 275.5C557.5 297.591 575.409 315.5 597.5 315.5L759 315.5"
              stroke="black"
              strokeWidth="40"
              strokeLinecap="round"
            />
            <path
              id="line2"
              d="M20.5001 451L226 451C248.091 451 266 468.909 266 491L266 530C266 552.091 283.908 570 306 570L475.5 570C497.591 570 515.5 587.909 515.5 610L515.5 776.5"
              stroke="black"
              strokeWidth="40"
              strokeLinecap="round"
            />
            <text fill="#fff">
              <textpath
                startOffset="0%"
                textAnchor="middle"
                alignmentBaseline="central"
                xlinkHref="#line1"
              >
                WEEKEND SALE EVENT
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  begin="0s"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </textpath>
            </text>
            <text fill="#fff">
              <textpath
                startOffset="0%"
                textAnchor="middle"
                alignmentBaseline="central"
                xlinkHref="#line1"
              >
                WEEKEND SALE EVENT
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  begin="3s"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </textpath>
            </text>

            <text fill="#fff">
              <textpath
                startOffset="0%"
                textAnchor="middle"
                alignmentBaseline="central"
                xlinkHref="#line2"
              >
                ONE Day
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  begin="0s"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </textpath>
            </text>
            <text fill="#fff">
              <textpath
                startOffset="0%"
                textAnchor="middle"
                alignmentBaseline="central"
                xlinkHref="#line2"
              >
                special OFFER
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="100%"
                  begin="3s"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </textpath>
            </text>
          </svg>
          <div className="box__content">
            get up to <span>50%</span> off
            <div className="box__btn">shop now</div>
          </div>
        </a>
        {/* <a className="box box--3">
          <svg
            className="box__background"
            viewBox="0 0 540 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M420 270C420 352.843 352.843 420 270 420C187.157 420 120 352.843 120 270C120 187.157 187.157 120 270 120C352.843 120 420 187.157 420 270Z"
              fill="black"
            />
          </svg>

          <svg
            className="box__background box__text-svg"
            viewBox="0 0 540 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="circle1"
              d="M440 270C440 363.888 363.888 440 270 440C176.112 440 100 363.888 100 270C100 176.112 176.112 100 270 100C363.888 100 440 176.112 440 270Z"
              strokeWidth="40"
            />
            <text>
              <textPath
                alignmentBaseline="middle"
                href="#circle1"
                stroke="none"
                fill="#000"
              >
                SUPER SALE • BEST OFFER • the full • SUPER SALE • SALE EVENT •
              </textPath>
            </text>
          </svg>

          <svg
            className="box__background box__text-svg box__text-svg--reverse"
            viewBox="0 0 540 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="circle2"
              stroke="#000"
              d="M480 270C480 385.98 385.98 480 270 480C154.02 480 60 385.98 60 270C60 154.02 154.02 60 270 60C385.98 60 480 154.02 480 270Z"
              strokeWidth="40"
            />

            <text>
              <textPath
                alignmentBaseline="middle"
                href="#circle2"
                stroke="none"
                fill="#fff"
              >
                10% 70% 35% 25% 55% 80% 15% 15% 80% 10% 70% 35% 25% 5% 80% 15%
                5% 80% 15%
              </textPath>
            </text>
          </svg>
          <svg
            className="box__background box__text-svg"
            viewBox="0 0 540 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="circle3"
              d="M520 270C520 408.071 408.071 520 270 520C131.929 520 20 408.071 20 270C20 131.929 131.929 20 270 20C408.071 20 520 131.929 520 270Z"
              strokeWidth="40"
            />

            <text>
              <textPath
                alignmentBaseline="middle"
                href="#circle3"
                stroke="none"
                fill="#000"
              >
                $ $$ $ $$$ $ $$ $$$ $$ $ $$ $ $ $ $$ $$$ $ $$ $ $ $$$ $$ $$ $ $
                $$$ $$ $$ $ $ $$$ $ $ $$ $$ $$$ $ $ $$$ $$$
              </textPath>
            </text>
          </svg>

          <div className="box__content">
            get up to <span>25%</span>
            <div className="box__btn">shop now</div>
          </div>
        </a> */}
        {/* <a className="box box--4">
          <div className="box__content">
            70%
            <span>WEEKEND SALE EVENT</span>
            5%
            <span>the full</span>
            20%
            <span>SUPER SALE</span>
            10%
            <span>5% off</span>
            <span>SALE</span>
            70%
            <span>SALE EVENT</span>
            <span>ONE Day</span>! 10%
            <span>SALE</span>
            <span>the full</span>
            70%! $$
            <span className="box__title box__title--top">Black Friday</span>
            <span>70%</span>$$!
            <span>85% off</span>
            <span className="box__title">shop now</span>$<span>5% off</span>$
            <span>50% OFF</span>
            <span>SALE</span>
            70%
            <span>BEST OFFER</span>
            <span>the full</span>$ 30%!
            <span>Limited time</span>
            50%<span>off sale</span>
            <span>special OFFER</span>
          </div>
        </a> */}
      </div>
    </div>
  );
};
