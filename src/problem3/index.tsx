// ============================= 0 =============================
// Add `blockchain` to the `WalletBalance` type to get priority for each blockchain

// OLD VERSION
// interface WalletBalance {
//   currency: string;
//   amount: number;
// }

// NEW VERSION
interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

// ============================ END 0 ==============================

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // ============================= 1 =============================
  // Repeated Computation:
  // The getPriority function is called multiple times for each balance in the sortedBalances computation.
  // This can be optimized by storing the priorities in a map for faster access.

  // Anti-Pattern:
  // The any type is used for the blockchain parameter in the getPriority function.
  // This can lead to runtime errors if the wrong type is passed.
  // It is recommended to use a more specific type or define a custom type for the blockchain.

  // OLD VERSION
  // const getPriority = (blockchain: any): number => {
  //   switch (blockchain) {
  //     case "Osmosis":
  //       return 100;
  //     case "Ethereum":
  //       return 50;
  //     case "Arbitrum":
  //       return 30;
  //     case "Zilliqa":
  //       return 20;
  //     case "Neo":
  //       return 20;
  //     default:
  //       return -99;
  //   }
  // };

  // NEW VERSION
  const priorityMap = useMemo(() => {
    const map = new Map<string, number>();
    map.set("Osmosis", 100);
    map.set("Ethereum", 50);
    map.set("Arbitrum", 30);
    map.set("Zilliqa", 20);
    map.set("Neo", 20);

    return map;
  }, []);

  const getPriority = useCallback(
    (blockchain: string): number => priorityMap.get(blockchain) || -99,
    [priorityMap]
  );

  // ============================ END 1 ==============================

  // ============================= 2 =============================
  // Undefined Variable: lhsPriority
  //    The intention seems to be to use balancePriority for comparison, but instead, lhsPriority is used, which does not exist.
  // Incorrect Filtering:
  //    I think it's better to filter out balances where amount is greater than 0.
  //
  // To fix these issues.
  //    1. Replace lhsPriority with balancePriority.
  //    2. Simplify the conditional logic

  // OLD VERSION
  // const sortedBalances = useMemo(() => {
  //   return balances
  //     .filter((balance: WalletBalance) => {
  //       const balancePriority = getPriority(balance.blockchain);
  //       if (lhsPriority > -99) {
  //         if (balance.amount <= 0) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     })
  //     .sort((lhs: WalletBalance, rhs: WalletBalance) => {
  //       const leftPriority = getPriority(lhs.blockchain);
  //       const rightPriority = getPriority(rhs.blockchain);
  //       if (leftPriority > rightPriority) {
  //         return -1;
  //       } else if (rightPriority > leftPriority) {
  //         return 1;
  //       }
  //     });
  // }, [balances, prices]);

  // NEW VERSION
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount <= 0 // Maybe filter out balances where amount is greater than 0: balance.amount > 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances, priorityMap, getPriority]);

  // ============================ END 2 ==============================

  // ============================= 3 =============================
  // Redundant Mapping: The formattedBalances array is created by mapping the sortedBalances array and adding a formatted property.
  // However, this mapping is not used anywhere in the code. It can be removed to improve efficiency.

  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  // ============================ END 3 ==============================

  // ============================= 4 =============================
  const rows = sortedBalances.map(
    // OLD VERSION
    // (balance: FormattedWalletBalance, index: number) => {

    // NEW VERSION
    (balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          // `classes` is not defined. It can be removed or import from the styles module
          className={classes.row}
          // The key prop is set to the index of the rows array
          // While this is not necessarily an issue, it can cause issues if the order of the balances changes

          // key={index}

          // Recommended: Use the currency and amount as the key (a unique identifier)
          key={`${balance.currency}-${balance.amount}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  // ============================ END 4 ==============================

  return <div {...rest}>{rows}</div>;
};
