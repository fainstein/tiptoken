import { Address } from "viem";

export const trimAddress = ({
  address,
  trimSize = 4,
}: {
  address: Address;
  trimSize?: number;
}) => {
  const trimStart = address.substring(0, trimSize);
  const trimEnd = address.substring(address.length - trimSize);

  return `${trimStart}${".".repeat(3)}${trimEnd}`;
};

export const generateMessage = (timestamp?: number) => {
  return `Please sign this message to verify ownership.`;
};
