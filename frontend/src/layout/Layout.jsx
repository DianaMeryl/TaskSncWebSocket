import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components//Header';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-custom-image bg-cover bg-custom-pos h-screen">
            <div className="flex-1">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
      )
}



