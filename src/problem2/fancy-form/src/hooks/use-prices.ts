import { useQuery } from "@tanstack/react-query";

type PriceType = {
  currency: string;
  date: string;
  price: number;
};

const usePrices = () => {
  return useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data = await response.json();
      return data as PriceType[];
    },
  });
};

export default usePrices;
