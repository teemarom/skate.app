import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Map from "./Map"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import { Tricks } from './Tricks';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import LogInScreen from './LogInScreen';
import Profile from './Profile';


const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [])

  return (
    <NavigationContainer>
      {/*jos käyttäjä kirjautunut, muuten LogInScreen*/}
      {user ? (
      <Tab.Navigator>
        <Tab.Screen name="Homepage" component={Homepage} options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={28} color="black" />
        }} />
        <Tab.Screen name="Tricks" component={Tricks} options={{
          tabBarLabel: "Tricks",
          tabBarIcon: ({ size, color }) => <MaterialIcons name="skateboarding" size={28} color="black" />
        }} />
        <Tab.Screen name="Map" component={Map} options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ size, color }) => <FontAwesome name="map" size={24} color="black" />
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={24} color="black" />
        }} />
      </Tab.Navigator>
      ) : (
        <LogInScreen /> 
      )}
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
