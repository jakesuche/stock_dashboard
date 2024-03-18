import { Inter } from 'next/font/google';
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

type Props = {
    children:React.ReactNode
}

const  Layout:React.FC<Props> = ({children}) => {
  return (
    <main className={`flex flex-col items-center  ${inter.className} w-full`}>
      <section className="bg-gray-50  w-full h-screen">
        {children}
      </section>
    </main>
  );
}

export default Layout;