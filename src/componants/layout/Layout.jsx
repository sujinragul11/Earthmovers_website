import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from '../shared/SEO';

const Layout = ({ children, seoProps }) => {
  return (
    <>
      <SEO {...seoProps} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;