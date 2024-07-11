import { useContext, useEffect, useMemo, useState } from "react";
import usePrices from "./use-prices";
import { TokenContext } from "../components/swap/context";

export type TokenInfo = {
  name: string;
  src: string;
};

const useTokens = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  const { data: prices } = usePrices();
  const { tokenIn, tokenOut } = useContext(TokenContext);

  const avaliableTokens = useMemo(() => {
    if (!prices || prices.length === 0) return [];

    const currencies = prices.map((price) => price.currency);

    const blackLists = [tokenIn?.name, tokenOut?.name];

    return tokens.filter(
      (token) =>
        currencies.includes(token.name) && !blackLists.includes(token.name)
    );
  }, [prices, tokens, tokenIn, tokenOut]);

  useEffect(() => {
    const importAll = async () => {
      const images = import.meta.glob("/public/tokens/*.svg", {
        query: "?url",
        import: "default",
      });

      const tokenData: TokenInfo[] = await Promise.all(
        Object.entries(images).map(async ([path, importFn]) => {
          const src = (await importFn()) as string;
          const name = path.split("/").pop()?.replace(".svg", "") || "";
          return { name, src: src.replace("/public", "") };
        })
      );

      setTokens(tokenData);
    };

    importAll();
  }, [prices]);

  return {
    tokens,
    avaliableTokens,
  };
};

export default useTokens;
