import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { box, randomBytes } from 'tweetnacl';
import { decodeUTF8, encodeUTF8, encodeBase64, decodeBase64 } from 'tweetnacl-util';

export const generateKeyPair = async (mnemonic: string = generateMnemonic()) => {
  const seed = await mnemonicToSeed(mnemonic);
  const keyPair = box.keyPair.fromSecretKey(seed.slice(0, 32));
  
  return {
    mnemonic,
    keyPair,
    publicKey: encodeBase64(keyPair.publicKey),
    secretKey: encodeBase64(keyPair.secretKey)
  };
};

export const encryptPassword = (password: string, publicKey: Uint8Array) => {
  const ephemeral = box.keyPair();
  const nonce = randomBytes(box.nonceLength);
  const messageUint8 = decodeUTF8(password);
  const encrypted = box(messageUint8, nonce, publicKey, ephemeral.secretKey);
  
  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);
  
  return encodeBase64(fullMessage);
};

export const decryptPassword = (
  messageWithNonce: string,
  secretKey: Uint8Array,
  publicKey: Uint8Array
) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(box.nonceLength);
  
  const decrypted = box.open(message, nonce, publicKey, secretKey);
  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }
  
  return encodeUTF8(decrypted);
};