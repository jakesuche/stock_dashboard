import { AxiosResponse } from "axios";
import Layout from "components/Layout";
import StockCard from "components/StockCard";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";
import React, { useEffect } from "react";
import { axioInstance } from "services/config";
import useStockStore from "stores/stocks";
import { socket } from "utils/socket";

type Props = {
  results: Stock[];
  status: string;
};

export async function getStaticProps() {
  const response: AxiosResponse<Props> = await axioInstance.get("api/stock");
  const stocks = response.data.results || [];
  // this will attempt to re-generate the page:
  // - When a request comes in
  // - At most once every 5 seconds
  return { props: { stocks }, revalidate: 5 };
}

const Stocks: NextPageWithLayout<{ stocks: Stock[] }> = ({
  stocks: initialStock,
}) => {
  const { setStock, stocks } = useStockStore();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {});
    socket.on("update", (res) => {
      setStock(res);
      socket.emit("updated", res);
    });
    setStock(initialStock);
  }, []);

  return (
    <div className="max-auto max-w-screen p-4 h-full">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900  ">
              We invest in the world’s potential
            </h1>
            <p className="mb-8 text-md font-normal text-gray-500  dark:text-gray-400">
              Prices displayed on this website are updated every 5 seconds on
              page reload. To access real-time data, please view each of the
              stock
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {stocks?.map(({ symbol, price }) => {
          return (
            <Link key={symbol} href={`/stocks/${symbol}`}>
              <StockCard price={price} symbol={symbol} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

Stocks.getLayout = (page) => {
  return (
    <Layout
      pageTitle="Explore the Latest Stock Prices"
      pageDescription="Discover real-time stock prices and symbols of various companies. Stay updated with the latest trends and fluctuations in the stock market. Explore our comprehensive stock listing page to make informed investment decisions."
    >
      {page}
    </Layout>
  );
};

export default Stocks;
