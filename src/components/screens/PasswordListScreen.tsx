import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { authenticateWithBiometrics } from "../../services/biometrics";
import type { StoredPassword } from "../../types";

export function PasswordListScreen({ navigation }) {
  const [passwords, setPasswords] = useState<StoredPassword[]>([]);

  const viewPassword = async (password: StoredPassword) => {
    if (password.requiresBiometrics) {
      const authenticated = await authenticateWithBiometrics(
        "Authenticate to view password"
      );
      if (!authenticated) return;
    }
    
    // Decrypt and show password
    navigation.navigate("PasswordDetail", { passwordId: password.id });
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl mb-4">Your Passwords</label>
      
      <listView
        items={passwords}
        itemTemplate={(item) => (
          <gridLayout columns="*, auto" className="p-2 border-b">
            <label col="0" text={item.site} />
            <button
              col="1"
              text="View"
              onTap={() => viewPassword(item)}
            />
          </gridLayout>
        )}
      />
      
      <button
        className="btn btn-primary"
        onTap={() => navigation.navigate("AddPassword")}
      >
        Add Password
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