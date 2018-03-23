import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Image } from 'react-native';

import Header from './../../components/Header';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Timeline from 'react-native-timeline-listview' 



export default class TimelineScreen extends Component {

  static navigationOptions = {
    title: 'Timeline',
     tabBarIcon: ({tintColor}) => (
        <Icon name="heart" size={24} color={tintColor} />
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
      <View style={styles.container}>
        <Avatar 
            large
            rounded
            icon={{type: 'font-awesome', name: 'paw', color: '#5497A7'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        <Text style={styles.generalText}>
          Your time with Hobbes!
        </Text>
        <View style={styles.timelineContainer}>
          <Image style = {styles.timelinePlaceholder} source = {require('../../img/timelinePlaceholder.png')} resizeMode="contain"/>
        </View>
        <Icon.Button name="heart" backgroundColor="#5497A7" 
          onPress={() => this.props.navigation.navigate('AddEvent')} >
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: "white"}}>Add an Event</Text>
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  generalText: {
    fontFamily: 'Helvetica', 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#5497A7', 
    margin: 10
  },
  timelineContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  timelinePlaceholder: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

AppRegistry.registerComponent('TimelineScreen', () => TimelineScreen);
