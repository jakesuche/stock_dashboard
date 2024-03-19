import { AxiosResponse } from "axios";
import StockCard from "components/StockCard";
import Link from "next/link";
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
  return { props: { stocks } };
}

const Stocks: React.FC<{ stocks: Stock[] }> = ({ stocks: initialStock }) => {
  const { setStock, stocks } = useStockStore();

 

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {});
    socket.on("update", (res) => {
      setStock(res);
      socket.emit("updated", res);
    });
    // socket.on("disconnect", () => {
    //   socket.disconnect(); 
    // });
    setStock(initialStock);
  //  return () => {
  //   socket.disconnect(); 
  //  }
  }, []);

  return (
    <div className="max-auto max-w-screen p-4 h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {stocks?.map(({ symbol, price }, i) => {
          return (
            <Link key={symbol} href={`/stocks/${symbol}`}>
              <StockCard  price={price} symbol={symbol} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Stocks;
