import { TokenInfo } from "../../../hooks/use-tokens";

interface TokenItemProps {
  token: TokenInfo;
  onSelected: (token: TokenInfo) => void;
}

const TokenItem = ({ token, onSelected }: TokenItemProps) => {
  return (
    <div
      onClick={() => onSelected(token)}
      className="cursor-pointer bg-white/5 px-4 py-5 mb-2 rounded-lg flex flex-row items-center justify-start gap-3"
    >
      <img src={token.src} alt="token" width={32} height={32} />
      <span className="font-semibold">{token.name}</span>
    </div>
  );
};

export default TokenItem;
