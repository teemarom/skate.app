# Skate.app

A mobile app for skateboarders. Create an account, keep track of the tricks you are practicing and the ones you have landed, and find skateparks in the Helsinki area with navigation through your phone's maps app.


## Features

### Accounts
- Create an account with an email address and a password (email validation, password re-typing and a minimum length of 6 characters)
- Sign in and sign out
- Stay signed in between app launches
- Friendly error messages, for example for a wrong password or an email that is already registered

### Home

A welcome screen with a short guide to the app.

### Tricks

A personal trick tracker.

- Add a trick with a name and details like location and obstacle
- Two lists: **In Progress** and **Landed**, each with a trick counter
- Confirmation pop-ups for moving trick between tabs and deleting trick
- Tricks are saved to the cloud and are available again after restarting the app


### Map

Find skateparks and get directions.

- Map centered on the Helsinki region
- Markers for skateparks in Helsinki, Espoo, Vantaa, Kerava and Järvenpää
- Your own position shown with a custom skateboarder marker (after you grant location permission)
- Tap a skatepark marker to open a menu and start navigation in **Apple Maps** (iOS only) or **Google Maps**

### Profile

Shows the email address of the signed-in user and a Sign Out button.

## Tech stack

- Expo (SDK 58) and React Native 0.88
- React 19 and TypeScript
- React Navigation (bottom tabs)
- Firebase (Authentication and Realtime Database)
- @react-native-async-storage/async-storage for keeping the user signed in
- react-native-maps
- expo-location
- expo-haptics
- @expo/vector-icons

## Getting started

### Requirements

- Node.js (LTS) and npm
- A phone with the [Expo Go](https://expo.dev/go) app, or an Android emulator / iOS simulator
- A free [Firebase](https://console.firebase.google.com/) project

### 1. Install
 
```bash
git clone https://github.com/teemarom/skate.app.git
cd skate.app
npm install
```
 
### 2. Set up Firebase
 
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a **web app** to the project (`</>` icon) to get your configuration values.
3. Go to **Build > Authentication > Sign-in method** and enable **Email/Password**.
4. Go to **Build > Realtime Database** and create a database.
5. Set the database rules so that every user can only access their own data:
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```
 
### 3. Add your configuration
 
Copy `.env.example` to `.env` in the project root and fill in the values from the Firebase Console (**Project settings > Your apps**):
 
```bash
cp .env.example .env
```
 
Do not commit `.env`. It is listed in `.gitignore`.
 
### 4. Run
 
```bash
npx expo start
```
 
Scan the QR code shown in the terminal with Expo Go (Android) or the Camera app (iOS). If you change `.env` later, restart Expo with `npx expo start -c`.


## Permissions

The app asks for **foreground location permission** when the Map tab opens. The location is read once from the device and used only to show your position on the map. It is kept in memory, not stored or sent anywhere. If you deny the permission, the map and skateparks still work, but your own marker is not shown.
- **Account and tricks:** your email address is stored in Firebase Authentication, and your tricks are stored in Firebase Realtime Database under your own user id. Database rules prevent other users from reading them.

## How navigation works

Tapping a skatepark opens a bottom sheet with the park's name and navigation options. The app builds a link from the park's coordinates and opens it with `Linking.openURL`, so the route is shown in the phone's own maps app. The maps app uses your current position as the starting point.

- **Apple Maps** option is shown only on iOS
- **Google Maps** option opens the Google Maps app if installed, otherwise the browser

## Project structure

```
index.ts                   App entry point
app/
  App.tsx                  Navigation and sign-in state (tabs when signed in, sign-in screens otherwise)
  Homepage.tsx             Welcome screen
  Tricks.tsx               Trick tracker
  Map.tsx                  Map with skateparks and user location
  Profile.tsx              Signed-in user and sign out
  LogInScreen.tsx          Switches between sign in and account creation
  LogIn.tsx                Sign in screen
  CreateAccount.tsx        Account creation screen
components/
  TrickItem.tsx            Single row in the trick list
  NavigateSheet.tsx        Bottom sheet for starting navigation
  navigation.ts            Functions for opening Apple Maps / Google Maps
  skateparks.ts            Skatepark data (id, name, coordinates)
config/
  firebaseConfig.ts        Firebase setup (reads values from .env)
types/
  Skatepark.ts             Skatepark type
  Trick.ts                 Trick type
assets/                    Images and icons
.env.example               Template for Firebase configuration
```

*This README was drafted with the help of Claude (Anthropic) and reviewed and edited by the author.*
