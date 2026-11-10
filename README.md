# Skate.app

A mobile app for skateboarders. Keep track of the tricks you are practicing and the ones you have landed, and find skateparks in the Helsinki area with navigation through your phone's maps app.


## Features

### Home

A welcome screen with a short guide to the app.

### Tricks

A personal trick tracker.

- Add a trick with a name and a description
- Two lists: **In Progress** and **Landed**, each with a trick counter
- Confirmation pop-ups for moving trick between tabs and deleting trick


### Map

Find skateparks and get directions.

- Map centered on the Helsinki region
- Markers for skateparks in Helsinki, Espoo, Vantaa, Kerava and Järvenpää
- Your own position shown with a custom skateboarder marker (after you grant location permission)
- Tap a skatepark marker to open a menu and start navigation in **Apple Maps** (iOS only) or **Google Maps**

## Tech stack

- [Expo](https://expo.dev/) (SDK 58) and [React Native](https://reactnative.dev/) 0.88
- React 19 and TypeScript
- [React Navigation](https://reactnavigation.org/) (bottom tabs)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

## Getting started

### Requirements

- Node.js (LTS) and npm
- A phone with the [Expo Go](https://expo.dev/go) app, or an Android emulator / iOS simulator

### Install and run

```bash
git clone https://github.com/teemarom/skate.app.git
cd skate.app
npm install
npx expo start
```

Scan the QR code shown in the terminal with Expo Go (Android) or the Camera app (iOS).


## Permissions

The app asks for **foreground location permission** when the Map tab opens. The location is read once from the device and used only to show your position on the map. It is kept in memory, not stored or sent anywhere. If you deny the permission, the map and skateparks still work, but your own marker is not shown.

## How navigation works

Tapping a skatepark opens a bottom sheet with the park's name and navigation options. The app builds a link from the park's coordinates and opens it with `Linking.openURL`, so the route is shown in the phone's own maps app. The maps app uses your current position as the starting point.

- **Apple Maps** option is shown only on iOS
- **Google Maps** option opens the Google Maps app if installed, otherwise the browser

## Project structure

```
App.tsx                    Tab navigation (Home, Tricks, Map)
Homepage.tsx               Welcome screen
Tricks.tsx                 Trick tracker
Map.tsx                    Map with skateparks and user location
components/
  TrickItem.tsx            Single row in the trick list
  NavigateSheet.tsx        Bottom sheet for starting navigation
  navigation.ts            Functions for opening Apple Maps / Google Maps
  skateparks.ts            Skatepark data (id, name, coordinates)
types/
  Skatepark.ts             Skatepark type
  Trick.ts                 Trick type
```

*This README was drafted with the help of Claude (Anthropic) and reviewed and edited by the author.*
