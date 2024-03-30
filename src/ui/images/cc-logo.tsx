import CafeCrypto from "@/../public/CafeCrypto.png";
import Image from "next/image";

const CCLogo = ({ size = 24 }) => (
  <Image alt="cafe-crypto-unit" src={CafeCrypto} width={size} height={size} />
);

export default CCLogo;
