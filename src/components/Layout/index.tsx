import { Inter } from 'next/font/google';
import React from 'react'
import type { FC, ReactNode } from "react";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });



interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  hideFooter?: boolean;
  image?: string;
  keyWords?: string[];
  hideNav?: boolean;
  hideChat?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
  image,
  keyWords,

}) => {
 
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={image} />
        <meta name="description" content={pageDescription} />
      </Head>

      <main className={`flex flex-col items-center  ${inter.className} w-full`}>
        <section className="bg-gray-50  w-full h-screen">{children}</section>
      </main>
    </>
  );
};

export default Layout;
