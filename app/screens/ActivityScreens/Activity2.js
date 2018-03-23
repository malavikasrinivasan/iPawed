import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';

import Header from './../../components/Header';

export default class Activity2 extends Component {

  static navigationOptions = {
    title: 'Activity Screen 2',
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
          This is the page for Activity2
        </Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Activity2', () => Activity2);
