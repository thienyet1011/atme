import React, { ReactNode } from "react";
import Script from "next/script";

import Head from "next/head";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Menu from "./components/Menu"

interface LayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        {description && <meta name="description" content={description} />}
      </Head>

      <header className="landing-page">
        <div className="headerPart">
          {/* Top menu */}
          <div className="header-top top-layout-02">
            <Header/>
          </div>

          {/* Main menu */}
          <div className="header-main-container">
            <Main/>
          </div>

          {/* Main navigator  */}
          <Menu/>
        </div>
      </header>

      {children}

      <Footer />

      <Script src={prefix + '/js/jquery/jquery-3.3.1.js'} strategy="beforeInteractive" />
      <Script src={prefix + '/js/nav-accordion/index.js'} strategy="beforeInteractive" />
    </React.Fragment>
  );
};

Layout.defaultProps = {
  title:
    "Công ty TNHH MTV Thương mại điện tử ATME Việt Nam - Công ty TNHH MTV Thương mại điện tử ATME Việt Nam",
};

export default Layout;
