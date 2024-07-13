import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className='underroot'>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{}}>
        <Toaster />
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

Layout.defaultProps = {
  title: 'Ecommerce Website - shop now',
  description: 'full stack project',
  keywords: 'full stack, mern, firebase, node',
  author: 'Ayush Sharma',
};

export default Layout;
