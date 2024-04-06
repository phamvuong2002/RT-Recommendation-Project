import React from 'react'
import { ShoppingCartLoader } from './loaders/ShoppingCartLoader';
import { SingleBill } from './SingleBill';



const Bills = ({ bills, className = "", setReload }) => {
    const NUMLOADER = 5

    const groupBooksByBillId = (bills) => {
        const groupedBills = {};
        bills.forEach(bill => {
            const { billId, ...bookDetails } = bill;
            if (groupedBills[billId]) {
                groupedBills[billId].push(bookDetails);
            } else {
                groupedBills[billId] = [bookDetails];
            }
        });
        return groupedBills;
    }

    // Group bills by billId
    const groupedBills = groupBooksByBillId(bills);

    return (
        <div className={className}>
            {
                bills.length === 0 ?
                    <ShoppingCartLoader items={NUMLOADER} />
                    :
                    <div className="">
                        {
                            Object.keys(groupedBills).map(billId => (
                                <div key={billId}>
                                    <div className="flex items-center justify-between xl:py-2 xl:h-8 xl:rounded-full h-7 w-full text-white px-1 font-semibold bg-red-500">
                                        <div className="xl:pl-1"> Số hoá đơn #{billId}</div>
                                        <div className="xl:pr-1">({groupedBills[billId].length} đơn hàng)</div>
                                    </div>
                                    {/* Render Swiper here for each group of bills */}
                                    {groupedBills[billId].map(bill => (
                                        <SingleBill key={bill.detailBillId} bill={bill} setReload={setReload} />
                                    ))}
                                </div>
                            ))
                        }
                    </div>


            }
        </div>
    )
}

export default Bills