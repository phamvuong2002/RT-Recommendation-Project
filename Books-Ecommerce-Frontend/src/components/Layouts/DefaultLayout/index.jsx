import React from 'react';
import { Header } from '../../Header';
import { Navbar } from '../../Navbar';
import { Footer } from '../../Footer';
import { Spinner } from '../../loaders/Spinner';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Spinner />
      <Header />
      <Navbar />
      <div className="">
        <div className="bg-[#efefef] flex flex-col gap-[0.1rem]">
          {/* Pages */}
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
