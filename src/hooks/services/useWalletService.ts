import useWeb3Service from "./useWeb3Service";

const useWalletService = () => {
  const web3Service = useWeb3Service();

  return web3Service.getWalletService();
};

export default useWalletService;
