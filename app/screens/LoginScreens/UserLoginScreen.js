import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';

import Header from './../../components/Header';

export default class UserLoginScreen extends Component {
  
  static navigationOptions = {
    title: 'Login',
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
          Please Log in here!
        </Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('UserLoginScreen', () => UserLoginScreen);