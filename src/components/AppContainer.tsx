import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { PasswordListScreen } from './screens/PasswordListScreen';
import { AddPasswordScreen } from './screens/AddPasswordScreen';
import { MnemonicScreen } from './screens/MnemonicScreen';

const StackNavigator = stackNavigatorFactory();

export function AppContainer() {
  const { isAuthenticated } = useAuth();

  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={isAuthenticated ? "PasswordList" : "Login"}
        screenOptions={{
          headerShown: true,
        }}
      >
        {!isAuthenticated ? (
          <>
            <StackNavigator.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <StackNavigator.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <StackNavigator.Screen
              name="Mnemonic"
              component={MnemonicScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <StackNavigator.Screen
              name="PasswordList"
              component={PasswordListScreen}
              options={{ headerTitle: "Your Passwords" }}
            />
            <StackNavigator.Screen
              name="AddPassword"
              component={AddPasswordScreen}
              options={{ headerTitle: "Add Password" }}
            />
          </>
        )}
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
}