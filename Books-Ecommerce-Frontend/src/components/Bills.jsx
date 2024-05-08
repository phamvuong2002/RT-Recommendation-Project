import React from 'react';
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SingleBill } from './SingleBill';
import { determineBillStatus } from '../helpers/detemindBillsStatus';
import { Link } from 'react-router-dom';

const Bills = ({ bills, className = '', setReload }) => {
  const NUMLOADER = 5;

  const TOTALBILLSTATUS = {
    Completed: {
      name: 'Hoàn thành',
      bgColor: 'bg-green-500',
      textColor: 'bg-green-500',
    },
    Shipping: {
      name: 'Đang vận chuyển',
      bgColor: 'bg-blue-500',
      textColor: 'bg-blue-500',
    },
    Refunded: {
      name: 'Hoàn Trả',
      bgColor: 'bg-red-200',
      textColor: 'bg-red-200',
    },
    Processing: {
      name: 'Đang xử lý',
      bgColor: 'bg-gray-500',
      textColor: 'bg-gray-500',
    },
  };

  const groupBooksByBillId = (bills) => {
    const groupedBills = {};
    bills.forEach((bill) => {
      const { billId, ...bookDetails } = bill;
      if (groupedBills[billId]) {
        groupedBills[billId].push(bookDetails);
      } else {
        groupedBills[billId] = [bookDetails];
      }
    });

    const entries = Object.entries(groupedBills);
    const reversedEntries = entries.reverse();
    return reversedEntries;
  };

  // Group bills by billId
  const groupedBills = groupBooksByBillId(bills);

  return (
    <div className={className}>
      {bills.length === 0 ? (
        <ShoppingCartLoader items={NUMLOADER} />
      ) : (
        <div className="">
          {groupedBills.map(([billId, orders]) => {
            const status = determineBillStatus(orders); // Đặt biến status tại vị trí này
            return (
              <div key={billId} className="">
                <div className="flex items-center text-xs justify-between xl:text-base gap-3 xl:py-2 xl:h-8 xl:rounded-full h-7 w-full text-white px-1 font-semibold bg-red-500">
                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                      <div className="xl:pl-1"> Số hoá đơn #{billId}</div>
                      <div className="xl:pr-1">({orders.length} đơn hàng)</div>
                    </div>
                    <div className="flex items-center h-6 justify-center rounded-full bg-blue-300 px-2">
                      <Link to={`../order-detail/${billId}`}>Xem Chi Tiết</Link>
                    </div>
                  </div>
                  <div
                    className={`flex items-center bg-gray-400 rounded-full xl:text-sm xl:px-2 xl:items-center`}
                  >
                    {' '}
                    {/*${TOTALBILLSTATUS[status].bgColor} */}
                    <div className="flex items-center px-1 h-5 xl:h-5 xl:mb-[0.1rem]">
                      {TOTALBILLSTATUS[status].name}
                    </div>
                  </div>
                </div>
                {/* Render Swiper here for each group of bills */}
                {orders.map((bill) => (
                  <SingleBill
                    key={bill.detailBillId}
                    bill={bill}
                    billId={billId}
                    setReload={setReload}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bills;
