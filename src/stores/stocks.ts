import { create } from "zustand";

type IProps = {
  stocks: Stock[];
  setStock: (value: Stock[]) => void;
};

const useStockStore = create<IProps>((set) => ({
  stocks: [],
  setStock: (value) => set({ stocks: value }),
}));

export default useStockStore;
