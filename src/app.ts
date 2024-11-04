import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AuthProvider } from './context/AuthContext';
import { AppContainer } from './components/AppContainer';

Object.defineProperty(global, '__DEV__', { value: false });

const App = () => (
  <AuthProvider>
    <AppContainer />
  </AuthProvider>
);

ReactNativeScript.start(React.createElement(App, {}, null));