import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppRegistry
} from 'react-native';
import AboutScreen from './../screens/LoginScreens/AboutScreen';

export default class ControlPanel extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.menu}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}>
          <Text style={styles.links}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Contact Us</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#5AC8B0',
  },
  links: {
    color: 'white',
    fontSize: 20,
    margin: 15,
    textAlign: 'left',
    fontFamily: "Century Gothic"
  }
});

AppRegistry.registerComponent('ControlPanel', () => ControlPanel);
