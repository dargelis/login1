import React from 'react';
import { Text, View,Button,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
        createDrawerNavigator,
        DrawerContentScrollView,
        DrawerItemList,
        DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';
import DashboardScreen from './screens/dashboardScreen';
import AuthLoadingScreen from './screens/authLoadingScreen';
import PriceListScreen from './screens/plScreen';
import DeliveryNoteScreen from './screens/dnScreen';
import SalesOrdersScreen from './screens/soScreen';
import PurchaseOrdersScreen from './screens/poScreen';
import ChatScreen from './screens/chatScreen';
import Chat2Screen from './screens/chat2Screen';

import { AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';

// function doLogout() {
//   AsyncStorage.removeItem("token")
//       .then(
//           this.props.navigation.navigate('Login')
//       )
// }

const Drawer = createDrawerNavigator();

function MyDrawerNav() {
  return (
      <Drawer.Navigator 
      initialRouteName="SalesOrders"
      drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="SalesOrders" 
          component={SalesOrdersScreen} 
          options={{ title: 'Sales orders', drawerIcon: LogoTitle }}
          />
        <Drawer.Screen name="PurchaseOrders" component={PurchaseOrdersScreen} />
        <Drawer.Screen name="DeliveryNotes" component={DeliveryNoteScreen} />
        <Drawer.Screen name="Ask PaperMan" component={ChatScreen} 
        options={{ drawerIcon: LogoTitle }}/>
        <Drawer.Screen name="Ask PaperBot" component={Chat2Screen} 
        options={{ drawerIcon: LogoTitle }}/>
        <Drawer.Screen name="Notifications arrivals, campaigns, overdue" component={Chat2Screen} 
        options={{ drawerIcon: LogoTitle }}/>
      </Drawer.Navigator>

  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => props.navigation.navigate('Login')} />
      <DrawerItem label="GoBack" onPress={() => props.navigation.goBack()} />
      <DrawerItem label="Close" onPress={() => props.navigation.closeDrawer()} />
      
    </DrawerContentScrollView>
  );
}



function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./images/ant.jpg')}
    />
  );
}
function LogoTitleGreen() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./images/ant_green.jpg')}
    />
  );
}
function LogoTitleBlue() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./images/ant_blue.jpg')}
    />
  );
}


const Tab = createBottomTabNavigator();
function MyTabNavigator() {
  return (

      <Tab.Navigator>
        <Tab.Screen
          name='Orders'
          component={MyDrawerNav}
          options={{title: 'Orders', tabBarIcon: LogoTitle}}
          //options={{ headerTitle: props => <LogoTitle {...props} /> }}
        />
        <Tab.Screen
          name='Dashboard'
          component={DashboardScreen}
          options={{title: 'Dashboard', tabBarIcon: LogoTitleGreen}}
        />
        <Tab.Screen
          name='PriceList'
          component={PriceListScreen}
          options={{title: 'PriceList', tabBarIcon: LogoTitleBlue}}
        />
        {/* <Tab.Screen
          name='DeliveryNotes'
          component={DeliveryNoteScreen}
        /> */}
      </Tab.Navigator>
  
  )
}




const Stack = createStackNavigator()

function MainStackNavigator(){
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Auth' 
      
      screenOptions={({navigation}) => ({
        headerTitle: '', //<LogoTitle />,
        headerLeft: () => (

          <Avatar
            rounded
            source={require('./images/ant.jpg')}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />

          // <Button 
          // title="MyMenu" 
          // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          ),
      })}
      >
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ title: 'Login Screen' }}
          options={{
            headerTitle: props => <LogoTitle />,
            headerLeft: () => (
              <View
              />
            ),
          }}
        />

        <Stack.Screen
          name='Auth'
          component={AuthLoadingScreen}
          headerShown='false'
          options={{ title: 'Auth Screen' }}

        />

        <Stack.Screen
          name='MyTabs'
          component={MyTabNavigator}
          headerShown='true'
          // options={{
            // headerTitle: <LogoTitle />,
            // headerLeft: () => (
            //   <Button
            //     onPress={() =>this.props.navigate('DrawerOpen')}
            //     title="Menu"v
            //   />
            // ),
          // }}

          
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator

