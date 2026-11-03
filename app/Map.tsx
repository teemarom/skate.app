import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { skateparks } from "../components/skateparks";


export default function Map() {
    return (
        <View style={styles.container}>
            <MapView 
              style={{width: "100%", height: "100%"}}
                initialRegion={{
                  latitude: 60.1699,
                  longitude: 24.9384,
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }}
            >
              {skateparks.map((park) => (
                <Marker 
                  key={park.id}
                  coordinate={{latitude: park.latitude, longitude: park.longitude}}
                  title={park.name}
                />
              ))}
            </MapView>
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
});