import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from "./Map"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import { Tricks } from './Tricks';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Homepage" component={Homepage} options={{
            tabBarLabel: "Home",
            tabBarIcon: ({size, color}) => <MaterialIcons name="home" size={28} color="black" />
          }} />
          <Tab.Screen name="Tricks" component={Tricks}  options={{
            tabBarLabel: "Tricks",
            tabBarIcon:  ({size, color}) => <MaterialIcons name="skateboarding" size={28} color="black" />
          }}/>
          <Tab.Screen name="Map" component={Map} options={{
            tabBarLabel: "Map",
            tabBarIcon: ({size, color}) => <MaterialIcons name="map" size={28} color="black" />
          }}/>
        </Tab.Navigator>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
