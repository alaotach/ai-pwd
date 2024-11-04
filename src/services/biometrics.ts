import { Biometrics } from '@nativescript/biometrics';
import { FingerprintAuth } from '@nativescript/fingerprint-auth';
import { Camera } from '@nativescript/camera';

const biometrics = new Biometrics();
const fingerprintAuth = new FingerprintAuth();

export const checkBiometricAvailability = async () => {
  const available = await biometrics.isAvailable();
  return {
    biometricsAvailable: available,
    fingerprint: await fingerprintAuth.available(),
    face: available && available.face,
  };
};

export const authenticateWithBiometrics = async (reason: string) => {
  try {
    const result = await biometrics.verifyFingerprint({
      message: reason,
      fallbackMessage: 'Please use PIN instead'
    });
    return result;
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    return false;
  }
};

export const authenticateWithFace = async () => {
  try {
    const cameraAvailable = await Camera.isAvailable();
    if (!cameraAvailable) {
      throw new Error('Camera not available');
    }
    
    // Implementation for face recognition would go here
    // This requires additional setup with ML models
    return true;
  } catch (error) {
    console.error('Face authentication failed:', error);
    return false;
  }
};