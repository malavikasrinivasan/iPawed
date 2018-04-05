import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Header from './../components/Header';
import WelcomeScreen from './../screens/LoginScreens/WelcomeScreen';
import UserLoginScreen from './../screens/LoginScreens/UserLoginScreen';
import GetPetDetails from './../screens/LoginScreens/GetPetDetails';
import HomeScreen from './../screens/LoginScreens/HomeScreen';
import Activity1 from './../screens/ActivityScreens/Activity1';
import Activity2 from './../screens/ActivityScreens/Activity2';
import TimelineScreen from './../screens/JournalScreens/TimelineScreen';
import AddEventScreen from './../screens/JournalScreens/AddEventScreen';


// static navigationOptions = {
//   header: null,
// };


const LoginStack = StackNavigator({
  // Welcome: { screen: WelcomeScreen },
  // UserLogin: { screen: UserLoginScreen },
  // PetDetails: { screen: GetPetDetails },
  Home: { screen: HomeScreen },
});

const ActivityStack = StackNavigator({
  Activity1: { screen: Activity1 },
  Activity2: { screen: Activity2 },
});

const JournalStack = StackNavigator({
  Timeline: { screen: TimelineScreen },
  AddEvent: { screen: AddEventScreen },
  initialRouteName: 'Timeline'
});

export default TabNavigator(
  {
    Login: { screen: LoginStack },
    Activity: { screen: ActivityStack },
    Journal: { screen:  JournalStack   }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#5497A7',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
    header: null
  }
);


