import { Box, Button, Dialog } from "@mui/material";
import React from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";

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
    const getReadyConnector = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };
    getReadyConnector();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
};

const ConnectWalletModal = ({ open, setOpen }: ConnectWalletModalProps) => {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const onClickConnector = (connector: Connector) => {
    setOpen(false);
    connect({ connector });
  };

  const onClickDisconnect = () => {
    setOpen(false);
    disconnect();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        alignItems="center"
        p={5}
      >
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => onClickConnector(connector)}
          />
        ))}
        {isConnected && (
          <Button variant="contained" onClick={onClickDisconnect}>
            Disconnect
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default ConnectWalletModal;
