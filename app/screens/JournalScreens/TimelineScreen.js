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
          <Timeline
            styles={styles.list}
            data = {[
              {time: '09:00', title: 'Hello, World!'},
              {time: '10:45'},
              {time: '12:00'},
              {time: '14:00'},
              {time: '16:30'}
            ]}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            titleStyle={{fontSize:20, color: 'blue'}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
          />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});

AppRegistry.registerComponent('TimelineScreen', () => TimelineScreen);
