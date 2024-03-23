export const getExplorerTransactionUrl = (chainId: number) => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/`;
    case 10:
      return `https://optimistic.etherscan.io/tx/`;
    case 137:
      return `https://polygonscan.com/tx/`;
    case 42161:
      return `https://arbiscan.io/tx/`;
    default:
      break;
  }
};
