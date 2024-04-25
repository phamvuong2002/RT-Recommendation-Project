import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/main';
import { getdiscountwallet } from '../../apis/discount';
import { fetchAPI } from '../../helpers/fetch';
import { formatDate } from '../../utils/formatDate';
import { formatNumberToText } from '../../utils/formatNumberToText';

const StaggeredDropDownDiscount = ({ icon, setChosenDiscount, className }) => {
  const { userId } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [discoutData, setDiscoutData] = useState([]);
  const [countDiscount, setCountDiscount] = useState(0);
  const [isLoadingDiscounts, setIsLoadingDiscounts] = useState(false);

  //Load ví coupons của user
  useEffect(() => {
    const getDiscount = async () => {
      if (!userId) return;
      if (!open) return;
      setIsLoadingDiscounts(true);
      const discounts = await fetchAPI(`../${getdiscountwallet}`, 'POST', {
        userId,
      });
      if (discounts.status !== 200) {
        setDiscoutData([]);
        setCountDiscount(0);
      } else {
        setDiscoutData(discounts.metadata.data_discount);
        setCountDiscount(discounts.metadata.count_discount);
      }
      setIsLoadingDiscounts(false);
    };
    getDiscount();
  }, [userId, open]);

  return (
    <div
      className={`${className} flex w-full items-center bg-white font-inter`}
    >
      <motion.div
        animate={open ? 'open' : 'closed'}
        className="relative w-full"
      >
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center rounded-md transition-colors"
        >
          <div className="w-full">{icon}</div>
          {/* <span className="font-medium text-sm">Post actions</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span> */}
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-50%' }}
          className="flex flex-col max-h-[13.2rem] xl:max-h-[20rem] gap-1 p-2 rounded-lg bg-white shawdow shadow-xl absolute top-[120%] left-[50%] w-full overflow-y-auto no-scrollbar"
        >
          <div className=" px-4 font-semibold text-sm text-purple-500">
            Ví Voucher ({countDiscount})
          </div>
          {discoutData.map((discount) => (
            <Option
              key={discount.dw_discount_id}
              setOpen={setOpen}
              discount={discount}
              setChosenDiscount={setChosenDiscount}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ discount, setOpen, setChosenDiscount }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setChosenDiscount(discount);
        setOpen(false);
      }}
      className="flex gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-gradient-to-br hover:from-purple-100 hover:to-red-100 text-slate-700 hover:text-red-500 transition-colors cursor-pointer"
    >
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-purple-400 to-red-400 text-white text-center py-2  rounded-lg shadow-md relative">
          {/* Content */}
          <div className="flex flex-col gap-1">
            {/* Value */}
            <div className="flex items-center justify-center">
              <div
                id="cpnCode"
                className="border-dashed border text-white px-4 py-2 rounded-l w-[10rem] xl:max-w-[10rem]"
              >
                {discount.discount.discount_type === 'percentage' ? (
                  <div>Giảm {parseInt(discount.discount.discount_value)} %</div>
                ) : discount.discount.discount_type === 'fixed_amount' ? (
                  <div>
                    Giảm{' '}
                    {formatNumberToText(
                      parseInt(discount.discount.discount_value),
                    ) + ' '}
                    <span>đ</span>
                  </div>
                ) : (
                  <div>Giảm Giá</div>
                )}
              </div>
            </div>
            {/* Description */}
            <div className="flex gap-2 justify-between px-5">
              <div className="text-xs whitespace-nowrap overflow-x-auto no-scrollbar">
                {discount.discount.discount_name}
              </div>
              <div className="text-xs">
                HSD: {formatDate(discount.discount.discount_end_date)}
              </div>
              <button className="text-xs">
                SL: {discount.dw_discount_quatity}
              </button>
            </div>
          </div>

          <div className="w-8 h-4 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
          <div className="w-8 h-4 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
        </div>
      </div>
    </motion.li>
  );
};

export default StaggeredDropDownDiscount;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.01,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.01,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.01,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.01,
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
