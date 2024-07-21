import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PopupOpen } from '../popup/PopupOpen';
import { popupContent } from '../../helpers/popupContent';

const FloatingButton = () => {
    const [openFeedbackPopup, setOpenFeedbackPopup] = useState(false);

  const bounceTransition = {
    y: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeOut"
    }
  };

  const handleSurveyClick = () => {
    setOpenFeedbackPopup(false);
    window.open('https://forms.gle/zhu2AABk48gRLDgU7', '_blank');
  };

  useEffect(() =>{
    setTimeout(() =>{
        setOpenFeedbackPopup(true);
    }, [2000])
  }, [])

  return (
    <div className="fixed bottom-12 right-1 sm:bottom-4 sm:right-4  z-10">
        <PopupOpen
            open={openFeedbackPopup}
            setOpen={setOpenFeedbackPopup}
            // autoClose={2000}
            Title={
                <div className='flex justify-center items-center'>
                    <img
                    className="w-full"
                    src="/img/title_popup.png"
                    ></img>
                </div>
            }
            Content={
                <div>
                    <div className=" rounded-lg">
                        <div className="text-center">
                            {/* <h1 className="text-2xl font-bold text-red-500 mb-2">WELCOME TO <span className="text-red-500">BOOKADA</span></h1> */}
                            <p className="text-gray-700 mb-4">
                            Bookada là một dự án bán sách có hỗ trợ đưa ra các đề xuất sản phẩm nhằm cải thiện trải nghiệm người dùng.
                            </p>
                            <p className="text-gray-700 mb-6">
                            Cảm ơn các bạn đã trải nghiệm website của chúng tôi. Hãy dành chút thời gian tham gia khảo sát của chúng tôi nhé!
                            </p>
                            
                        </div>
                        <div className="flex justify-center gap-4 items-center mt-4">
                            <img src="/logo/logo_home.png" alt="Icon 1" className="w-16 h-20"/>
                            <button className="bg-gradient-to-r from-red-300 to-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:from-red-400 hover:to-red-600" onClick={handleSurveyClick}>
                            THAM GIA KHẢO SÁT
                            </button>
                            <img src="/logo/logo_home.png" alt="Icon 1" className="w-16 h-20"/>
                        </div>
                    </div>
                </div>
            }
            onNoClick={() => setOpenFeedbackPopup(false)}
        />
      {/* {isVisible && ( */}
        <motion.div
          className="mt-2"
        //   animate={{ y: [0, -10, 0] }}
        //   transition={bounceTransition}
           whileHover={{
            y: [0, -10, 0],
            transition: bounceTransition,
          }}
        >
          <button className="bg-red-50 border border-red-500 items-center text-center flex justify-center text-white rounded-full w-16 h-16 shadow-lg text-lg hover:bg-red-200" onClick={() => setOpenFeedbackPopup(true)}>
            <img src="/logo/logo_home.png" alt="Icon 1" className="w-8 h-10"/>
          </button>
        </motion.div>
      {/* )} */}
    </div>
  );
}

export default FloatingButton;
