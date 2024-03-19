import type { NextApiRequest, NextApiResponse } from "next";
import StockList from "data/stocks.json";


export default (async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req && req.method == "GET" && req?.query?.slug) {
    const slug = req?.query?.slug[0];

    const found = StockList.find(
      (item) => item?.symbol?.toLowerCase() === slug?.toString().toLowerCase()
    );
    if (Boolean(found)) {
      res.status(200).json({ status: "ok", result: found });
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "Stock not found", result: null });
    }
  }
});
