import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/dashboardScreen';
import PriceListScreen from './screens/plScreen';


// const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

function MyTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen
          name='Dashboard'
          component={DashboardScreen}
        />
        <Tab.Screen
          name='PriceList'
          component={PriceListScreen}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MyTabNavigator

