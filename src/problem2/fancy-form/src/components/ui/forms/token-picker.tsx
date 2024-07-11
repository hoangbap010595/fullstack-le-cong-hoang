import { useCallback, useContext, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useTokens, { TokenInfo } from "../../../hooks/use-tokens";
import TokenItem from "./token-item";
import { BiChevronDown } from "react-icons/bi";
import { TokenContext } from "../../swap/context";

type TokenPickerProps = {
  nickName: string;
};

const TokenPicker = ({ nickName }: TokenPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currToken, setCurrToken] = useState<TokenInfo>();

  const { setTokenIn, setTokenOut } = useContext(TokenContext);

  const { avaliableTokens } = useTokens();

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelected = useCallback(
    (token: TokenInfo) => {
      setCurrToken(token);
      if (nickName === "IN") setTokenIn(token);
      if (nickName === "OUT") setTokenOut(token);
      close();
    },
    [close, nickName, setTokenIn, setTokenOut]
  );

  return (
    <>
      <div
        data-testid="token-picker"
        className="flex items-center justify-center gap-2 p-3 border border-solid border-gray-700 bg-gray-600 rounded-lg cursor-pointer min-w-32"
        onClick={open}
      >
        {currToken && (
          <>
            <img src={currToken.src} alt="token" />
            <span className="font-bold">{currToken.name}</span>
            <BiChevronDown className="w-6 h-6" />
          </>
        )}

        {!currToken && (
          <>
            <span>Select token</span>
            <BiChevronDown className="w-6 h-6" />
          </>
        )}
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Select a token
              </DialogTitle>
              <div className="mt-2 text-sm/6 text-white/50 max-h-96 overflow-y-auto">
                {avaliableTokens.length > 0 &&
                  avaliableTokens.map((token) => (
                    <TokenItem
                      key={token.name}
                      token={token}
                      onSelected={handleSelected}
                    />
                  ))}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TokenPicker;
