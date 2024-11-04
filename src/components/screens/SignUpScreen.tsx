import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { generateKeyPair } from "../../utils/crypto";
import { checkBiometricAvailability } from "../../services/biometrics";

export function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [securityPhrase, setSecurityPhrase] = useState("");
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const handleSignUp = async () => {
    try {
      const { mnemonic, keyPair, publicKey } = await generateKeyPair();
      // Store mnemonic securely in app cache
      // Send user data to backend
      navigation.navigate("MnemonicDisplay", { mnemonic });
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl mb-4 font-bold">Sign Up</label>
      
      <textField
        hint="Username"
        text={username}
        onTextChange={(e) => setUsername(e.value)}
        className="input mb-4"
      />
      
      <textField
        hint="PIN"
        text={pin}
        secure={true}
        keyboardType="number"
        onTextChange={(e) => setPin(e.value)}
        className="input mb-4"
      />
      
      <textField
        hint="Security Phrase"
        text={securityPhrase}
        onTextChange={(e) => setSecurityPhrase(e.value)}
        className="input mb-4"
      />
      
      <switch
        checked={biometricsEnabled}
        onCheckedChange={(e) => setBiometricsEnabled(e.value)}
      />
      <label>Enable Biometrics</label>
      
      <button
        className="btn btn-primary"
        onTap={handleSignUp}
      >
        Sign Up
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  }
});