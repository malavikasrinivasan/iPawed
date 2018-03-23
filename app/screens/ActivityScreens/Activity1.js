import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Activity1 extends Component {

  static navigationOptions = {
    title: 'Activities',
    tabBarIcon: ({tintColor}) => (
        <Icon name="ios-infinite" size={24} color={tintColor}/>
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
          This is the page for Activity1
        </Text>
        <Button
          title="Go to Activity2"
          onPress={() => this.props.navigation.navigate('Activity2')}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Activity1', () => Activity1);