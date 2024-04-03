
import React from 'react'
import { Header } from '../../Header'
import { Navbar } from '../../Navbar'
import { Footer } from '../../Footer'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Navbar />
            <div className=" mb-10">
                <div className="bg-gray-50 flex flex-col gap-[0.1rem]">
                    {/* Pages */}
                    {children}
                </div>
            </div>
            <Footer /></div>
    )
}

export default DefaultLayout