import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

export default class WelcomeScreen extends Component {
  
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" size={24} color={tintColor} />
      ),
    headerStyle: {
      backgroundColor: '#5497A7',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View>
        <Text>
          Welcome to PetApp! 
        </Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('UserLogin')}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('WelcomeScreen', () => WelcomeScreen);
