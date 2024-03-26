import { getTransactions } from "@/app/api/transactions/getTransactions";
import { getI18n } from "@/locales/server";
import { StoredCamapignTransaction } from "@/types/db";
import { trimAddress } from "@/utils/address";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";
import { DateTime } from "luxon";
import { OpenInNew } from "@mui/icons-material";
import { getExplorerTransactionUrl } from "@/utils/transactions";

const TransactionsList = async ({
  campaignId,
  ccUnit,
}: {
  campaignId: number;
  ccUnit: number;
}) => {
  const t = await getI18n();
  const transactions = await getTransactions(campaignId);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h5">{t("cc.received")}</Typography>
      {transactions.length === 0 ? (
        <Box display="flex" gap={2} alignItems="center" justifyContent="center">
          <Image
            alt="cafe-crypto-unit"
            src={CafeCrypto}
            width={24}
            height={24}
          />
          <Typography variant="body1">{t("tx.no.transactions")} 🤑</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("tx.from")}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Image
                    alt="cafe-crypto-unit"
                    src={CafeCrypto}
                    width={24}
                    height={24}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>USD</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.hash}>
                  <TableCell>
                    <Typography variant="body1">
                      {trimAddress({ address: tx.sender_address })}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{tx.cc_amount}</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography variant="body1">
                      ${tx.cc_amount * ccUnit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {DateTime.fromJSDate(tx.created_at).toRelative()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`${getExplorerTransactionUrl(tx.chain_id)}${
                        tx.hash
                      }`}
                      target="_blank"
                      display="flex"
                    >
                      <OpenInNew />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionsList;
