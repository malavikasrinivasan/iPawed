import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Header from './app/components/Header';
import WelcomeScreen from './app/screens/LoginScreens/WelcomeScreen';
import UserLoginScreen from './app/screens/LoginScreens/UserLoginScreen';
import ActivityMain from './app/screens/ActivityScreens/ActivityMain';
import ActivityDetail from './app/screens/ActivityScreens/ActivityDetail';
import TimelineScreen from './app/screens/JournalScreens/TimelineScreen';
import AddEventScreen from './app/screens/JournalScreens/AddEventScreen';

const LoginStack = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  UserLogin: { screen: UserLoginScreen },
});

const ActivityStack = StackNavigator({
  ActivityMain: { screen: ActivityMain },
  ActivityDetail: { screen: ActivityDetail },
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
  }
);