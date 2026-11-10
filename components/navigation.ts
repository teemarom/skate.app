import { Linking, Platform } from 'react-native';

type Destination = {
    name: string;
    latitude: number;
    longitude: number;
};

// Funktiot navigointiin apple mapsilla tai google mapsilla
export function openAppleMaps({latitude, longitude}: Destination) {
    // dirflg: d = auto, w = kävely, r = joukkoliikenne
    Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`);
}

export function openGoogleMaps({ latitude, longitude }: Destination) {
  // travelmode: driving, walking, bicycling, transit
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`
  );
}

export const hasAppleMaps = Platform.OS === 'ios';