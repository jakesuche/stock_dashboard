import type { NextApiRequest, NextApiResponse } from "next";
import StockList from "data/stocks.json";



export default (async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req && req.method == "GET") {
    res.status(200).json({ status: "ok", results: StockList });
  }
});
