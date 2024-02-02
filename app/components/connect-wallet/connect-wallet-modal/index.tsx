import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { Connector, useConnect } from "wagmi";

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
    const getReadyConnects = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };
    getReadyConnects();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
};

const ConnectWalletModal = ({ open, setOpen }: ConnectWalletModalProps) => {
  const { connectors, connect } = useConnect();

  const onClickConnector = (connector: Connector) => {
    connect({ connector });
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box>
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => onClickConnector(connector)}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
