export interface User {
  id: string;
  username: string;
  publicKey: string;
  pinHash: string;
  securityPhrase: string;
  biometricsEnabled: boolean;
}

export interface StoredPassword {
  id: string;
  userId: string;
  site: string;
  username: string;
  encryptedPassword: string;
  requiresBiometrics: boolean;
}

export interface BiometricSettings {
  fingerprint: boolean;
  face: boolean;
  voice: boolean;
}