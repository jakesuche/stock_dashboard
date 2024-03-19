import { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { axioInstance } from "services/config";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug;
  try {
    const response: AxiosResponse<any> = await axioInstance.get(
      `api/stock/${slug}`
    );

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
 
  const stockdetails = data?.result

  if (!Boolean(stockdetails)){
    return (
      <div className="container mx-auto mt-8">
        <Link className="text-blue-600" href="/stocks">
          Back to Stocks
        </Link>
       
      </div>
    );
  }
    return (
      <div className="container mx-auto mt-8">
        <Link className="text-blue-600" href="/stocks">
          Back to Stocks
        </Link>
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
        <div className="mt-8">{/* <Line data={chartData} /> */}</div>
      </div>
    );
};

export default StockDetail;
