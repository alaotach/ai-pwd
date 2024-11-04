import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.securepass.manager',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    enableScreenCapture: false,
    forceEnableUserIsolation: true,
    package: 'com.securepass.manager',
    minSdkVersion: 23,
    targetSdkVersion: 33
  }
} as NativeScriptConfig;