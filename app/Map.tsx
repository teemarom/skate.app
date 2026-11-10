import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { skateparks } from "../components/skateparks";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import NavigateSheet from "../components/NavigateSheet";
import type { Skatepark } from '../types/skatepark';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export default function Map() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedPark, setSelectedPark] = useState<Skatepark | null>(null);

  // Kysyy käyttäjältä luvan sijainnin käyttöön
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to get location")
        return;
      }
      const CurrentLocation = await Location.getCurrentPositionAsync({});
      setLocation(CurrentLocation);
    })();
  }, []);

  {/*kartta*/}
  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
      >

        {location && // käyttäjän marker
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            title="You are here"
            anchor={{ x: 0.5, y: 0.5 }}
            zIndex={10}
          >
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="skateboarding" size={44} color="#B9F34A"
                style={{ position: "absolute" }}
              />
              <MaterialCommunityIcons name="skateboarding" size={40} color="black"
                style={{ position: "absolute" }}
              />
            </View>
          </Marker>
        }
        
        {/* parkkien listaus*/}
        {skateparks.map((park) => (
          <Marker
            key={park.id}
            coordinate={{ latitude: park.latitude, longitude: park.longitude }}
            pinColor="#fb9803"
            onPress={() => setSelectedPark(park)}
          />
        ))}
      </MapView>
      
      {/*Navigointi parkille*/}
      <NavigateSheet park={selectedPark} onClose={() => setSelectedPark(null)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});