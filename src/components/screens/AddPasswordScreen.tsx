import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { encryptPassword } from "../../utils/crypto";

export function AddPasswordScreen({ navigation }) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requiresBiometrics, setRequiresBiometrics] = useState(false);

  const handleSave = async () => {
    try {
      // Encrypt password with user's public key
      // Save to backend
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save password:", error);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl mb-4">Add Password</label>
      
      <textField
        hint="Site"
        text={site}
        onTextChange={(e) => setSite(e.value)}
        className="input mb-4"
      />
      
      <textField
        hint="Username"
        text={username}
        onTextChange={(e) => setUsername(e.value)}
        className="input mb-4"
      />
      
      <textField
        hint="Password"
        text={password}
        secure={true}
        onTextChange={(e) => setPassword(e.value)}
        className="input mb-4"
      />
      
      <switch
        checked={requiresBiometrics}
        onCheckedChange={(e) => setRequiresBiometrics(e.value)}
      />
      <label>Require Biometrics</label>
      
      <button
        className="btn btn-primary"
        onTap={handleSave}
      >
        Save Password
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    padding: 20
  }
});