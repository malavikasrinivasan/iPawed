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
        <View style={styles.topRow}>
          <Icon name="plus" size = {30} color="gray" style = {{margin: 10}} 
            onPress={() => this.props.navigation.navigate('AddEvent')}/>
          <Text style={styles.generalText}>
            Memories with Peanut
          </Text>
        </View>
        <View style={styles.timelineContainer}>
          <Image style = {styles.timelinePlaceholder} source = {require('../../img/timelinePlaceholder.png')} resizeMode="contain"/>
        </View>
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
    fontSize: 28, 
    color: 'gray', 
    margin: 10
  },
  topRow: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
