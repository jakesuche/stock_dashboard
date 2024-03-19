type Stock = {
  company: string;
  price: number;
  price_2022: number;
  price_2023: number;
  symbol: string;
  description: string;
  time_histories: {
    timestamp: string;
    price: string;
  }[];
};
