import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { axioInstance } from "services/config";
import { socket } from "utils/socket";
import InfoAlert from "components/InfoAlert";
import PriceChart from "components/PriceChart.ts";
import { NextPageWithLayout } from "pages/_app";
import Layout from "components/Layout";



export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug;
   ctx.res.setHeader(
     "Cache-Control",
     "public, s-maxage=10, stale-while-revalidate=59"
   );
  let response;
  try {
    response = await axioInstance.get(`api/stock/${slug}`);
  } catch (error) {
    response = null
  }
  return {
    props: {
      data: response?.data || null,
    },
  };
};

type Props = {
  data: {
    result: Stock;
  };
};

const StockDetail: NextPageWithLayout<Props> = ({ data }) => {
  const [stockdetails, setStockDetail] = useState(data?.result);

  useEffect(() => {
    if (!stockdetails?.symbol) return;
    const updateListener = (res: Stock[]) => {
      const find = res.find((item) => item.symbol === stockdetails.symbol);
      setStockDetail(find!);
    };

    socket.on("update", updateListener);
    return () => {
      socket.off("update", updateListener);
    };
  }, [stockdetails?.symbol]);

  return (
    <div className="container mx-auto mt-8">
      <Link className="text-blue-600"  href="/">
        Back to Stocks
      </Link>
      {stockdetails ? (
        <>
          <h1 className="text-3xl font-bold mt-4 text-gray-500">
            {stockdetails.company}
          </h1>
          <p className="text-gray-600">Symbol: {stockdetails.symbol}</p>
          <p className="text-gray-600 mt-2">
            Description: {stockdetails.description}
          </p>
          <div className="mt-4">
            <p className="text-gray-800 font-bold">
              Price: {stockdetails.price}
            </p>
          </div>
          <div className="mt-8">
            <PriceChart history={stockdetails.time_histories} />
          </div>
        </>
      ) : (
        <InfoAlert description="Stock item not found, confirm if your URL is correct" />
      )}
    </div>
  );
};


StockDetail.getLayout = (page) => {
  const details = page.props.data ? page.props.data.result : null;
  return (
    <Layout pageDescription={details?.description} pageTitle={details?.company}>
      {page}
    </Layout>
  );
};

export default StockDetail;
