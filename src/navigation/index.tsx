import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <PaperProvider>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </PaperProvider>
  );
}
