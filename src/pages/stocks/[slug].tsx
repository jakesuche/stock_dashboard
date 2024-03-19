import { AxiosResponse } from "axios";
import InfoAlert from "components/InfoAlert";
import PriceChart from "components/PriceChart.ts";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { axioInstance } from "services/config";
import { socket } from "utils/socket";


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug;
  try {
    const response: AxiosResponse = await axioInstance.get(`api/stock/${slug}`);

    return {
      props: {
        data: response.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        response: null,
      },
    };
  }
};

type Props = {
  data: {
    result: Stock;
  };
};

const StockDetail: React.FC<Props> = ({ data }) => {
  const  [stockdetails, setStockDetail] = useState(data?.result);
  let details;

  useEffect(()=>{
    socket.on("update", (res:Stock[])=>{
      const find = res.find((item) => item.symbol == stockdetails.symbol);
      setStockDetail(find!)
    });
  },[])


  if (Boolean(stockdetails)) {
    details = (
      <>
        <h1 className="text-3xl font-bold mt-4 text-gray-500">
          {stockdetails.company}
        </h1>
        <p className="text-gray-600">Symbol:{stockdetails.symbol} </p>
        <p className="text-gray-600 mt-2">
          Description: {stockdetails.description}
        </p>
        <div className="mt-4">
          <p className="text-gray-800 font-bold">Price: {stockdetails.price}</p>
          <p className="text-gray-600">
            Price in 2022: {stockdetails.price_2022}
          </p>
          <p className="text-gray-600">
            Price in 2023: {stockdetails.price_2023}
          </p>
        </div>
        <div className="mt-8">
          <PriceChart history={stockdetails?.time_histories} />
        </div>
      </>
    );
  } else {
    details = (
      <InfoAlert description="Stock item not found, confirm if your url is correct" />
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <Link className="text-blue-600" href="/stocks">
        Back to Stocks
      </Link>
      {details}
    </div>
  );
};

export default StockDetail;
