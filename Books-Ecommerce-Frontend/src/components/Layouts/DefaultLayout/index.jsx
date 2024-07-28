import React from 'react';
import { Header } from '../../Header';
import { Navbar } from '../../Navbar';
import { Footer } from '../../Footer';
import { Spinner } from '../../loaders/Spinner';
import { ProgressLoading } from '../../loaders/ProgressLoading';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <ProgressLoading/>
      <Spinner />
      <Header />
      <Navbar />
      <div>
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
