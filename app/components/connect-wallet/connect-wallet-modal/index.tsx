import React from "react";
import { Connector, useAccount, useConnect } from "wagmi";

interface ConnectWalletModalProps {
  open: boolean;
  setOpen: (shouldOpen: boolean) => void;
}

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className="border py-2 px-4 border-white rounded-xl"
    >
      {connector.name}
    </button>
  );
};

const ConnectWalletModal = ({ open, setOpen }: ConnectWalletModalProps) => {
  const { connectors, connect } = useConnect();

  return (
    open && (
      <div
        onClick={() => setOpen(false)}
        className="absolute top-0 left-0 w-screen h-screen bg-transparent backdrop-blur-sm z-10 flex justify-center items-center"
      >
        <div className="p-4 max-w-2xl max-h-full flex flex-col gap-2 bg-slate-900">
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector })}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default ConnectWalletModal;
