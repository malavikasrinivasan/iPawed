import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

import RecActCard from '../../components/RecActCard';
import HorActCards from '../../components/HorActCards';
import ActCat from '../../components/ActCat';

export default class ActivityMain extends Component {

  static navigationOptions = {
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
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground source={require('../../img/ActivityMain.jpeg')} style={{justifyContent:'flex-end', alignItems:'center', height:250}}>
          <View style={{flexDirection: 'row', backgroundColor:'rgba(255,255,255,0.5)'}}>
            <Text style={styles.welcome}>
              Activities
            </Text>
          </View>
        </ImageBackground>
        <RecActCard />
        <HorActCards style={{marginBottom:10}}/>
        <ActCat />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 25,
    fontWeight: 'bold',
    color:'white'
  },
  instructions: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold'
  },
});

AppRegistry.registerComponent('ActivityMain', () => ActivityMain);