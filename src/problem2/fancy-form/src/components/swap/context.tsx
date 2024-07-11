import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { TokenInfo } from "../../hooks/use-tokens";

interface TokenContextType {
  tokenIn: TokenInfo | undefined;
  setTokenIn: Dispatch<SetStateAction<TokenInfo | undefined>>;
  tokenOut: TokenInfo | undefined;
  setTokenOut: Dispatch<SetStateAction<TokenInfo | undefined>>;
  inputAmount: number | undefined;
  setInputAmount: Dispatch<SetStateAction<number>>;
  outputAmount: number | undefined;
  setOutputAmount: Dispatch<SetStateAction<number>>;
}

export const TokenContext = createContext<TokenContextType>({
  inputAmount: 0,
  outputAmount: 0,
} as TokenContextType);

export const TokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [tokenIn, setTokenIn] = useState<TokenInfo>();
  const [tokenOut, setTokenOut] = useState<TokenInfo>();

  return (
    <TokenContext.Provider
      value={{
        tokenIn,
        setTokenIn,
        tokenOut,
        setTokenOut,
        inputAmount,
        setInputAmount,
        outputAmount,
        setOutputAmount,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
