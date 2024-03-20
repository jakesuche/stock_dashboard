import React from "react";

type Props = {
  price: number;
  symbol: string;
};

const StockCard: React.FC<Props> = ({ price, symbol }) => {
  return (
    <div className="rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default  p-2 cursor-pointer shadow-sm">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black">{price}</h4>
          <span className="text-sm font-medium text-gray-800">{symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
