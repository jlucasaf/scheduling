import CryptoJS from "crypto-js";
import { keys } from "../../keys";



import * as Crypto from 'expo-crypto';

export const encript = async (value: string) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    value
  );
  return hash;
};