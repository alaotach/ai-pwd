import { android as androidApp } from '@nativescript/core/application';
import { BiometricAuth } from '@nativescript/biometrics';

export const checkAndroidBiometrics = async () => {
  if (androidApp) {
    const biometricAuth = new BiometricAuth();
    
    try {
      const result = await biometricAuth.available({
        title: 'Biometric Authentication',
        subtitle: 'Confirm your identity',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use PIN'
      });
      
      return {
        available: result.biometricAvailable,
        fingerprint: result.fingerprintAvailable,
        face: result.faceAvailable
      };
    } catch (error) {
      console.error('Biometric check failed:', error);
      return {
        available: false,
        fingerprint: false,
        face: false
      };
    }
  }
  return null;
};

export const authenticateAndroid = async () => {
  if (androidApp) {
    const biometricAuth = new BiometricAuth();
    
    try {
      const result = await biometricAuth.verifyBiometric({
        title: 'Authenticate',
        subtitle: 'Confirm your identity to view password',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use PIN'
      });
      
      return result.code === BiometricAuth.SUCCESS;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }
  return false;
};