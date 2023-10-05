# SecureNotesApp

A simple and secure note app built using react-native-encrypted-storage and react-native-biometrics.

# How to run

Navigate current directory to the project. Using npm, please run:

```js
npm install
```

If the above command doesn't work, try using:

```js
npm install --legacy-peer-deps
```

#### Android

To run this project using android:

```js
step 1: npx react-native start
step 2: npx react-native run-android
```

#### iOS

Or using ios:

```js
step 1: npx react-native start
step 2: npx react-native run-ios
```

# Storage

The app uses encrypted local storage to make sure every data is safe. If you wish to delete the data, navigate to app info -> app storage -> clear data.

# Unfinished Task & Action Plan

Unit Testing of the app.

> Action Plan: Use jest to write unit test based on every essential screens to minimize potential bugs.

# Suggestion for Improvement

Using a secure backend to save public key generated from biometrics/password, this public key will work as a comparison when user logged again.
