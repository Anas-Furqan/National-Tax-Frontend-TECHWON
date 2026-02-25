import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialMediaWidget from '../common/SocialMediaWidget';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <SocialMediaWidget />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1A1A2E',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#006837',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
