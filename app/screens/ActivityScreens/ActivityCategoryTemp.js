import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from 'react-native';
import { Card,
  ListItem,
  Button
} from 'react-native-elements';
import * as firebase from 'firebase';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import RecActCard from '../../components/RecActCard';
import HorActCards from '../../components/HorActCards';
import ActCat from '../../components/ActCat';
import ActivityCard from '../../components/ActivityCard';

export default class ActivityCategoryTemp extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name="paw" size={24} color={tintColor}/>
      ),
    title: 'Activities',
    headerTintColor: '#5AC8B0',
    headerBackTitle: 'back',
    headerBackTitleStyle: {
      fontFamily: 'Century Gothic'
    },
    headerTitleStyle: {
      fontFamily: 'SignPainter',
      fontSize: 28,
      color: 'black'
    },
  };

  render() {
    return (
      <ScrollView>
        <View style={{flexDirection:'row', justifyContent: 'center', flexWrap: 'wrap'}}>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center', margin: 18}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../img/hiking.jpeg')} style={{width:120, height:120, borderRadius: 0}}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Home"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center', margin: 18}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../img/surfing.jpeg')} style={{width:120, height:120, borderRadius: 0}}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Play"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center', margin: 18}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../img/surfing.jpeg')} style={{width:120, height:120, borderRadius: 0}}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Play"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center', margin: 18}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../img/surfing.jpeg')} style={{width:120, height:120, borderRadius: 0}}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Play"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 7,
    color:'black',
    // fontFamily: 'Century Gothic'
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: 'center',
    // fontFamily: 'Century Gothic',
    color: '#5AC8B0',
    margin: 10,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  cardStyle: {
    height: 150,
    margin: 10,
    marginLeft: 5,
    marginRight: 5
  },
  iconAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  activityTitle: {
    justifyContent:'center',
    alignItems:'center',
    color:'#5AC8B0',
    // fontFamily: 'Century Gothic',
    alignItems: 'center',
    margin: 8
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  instructions: {
    fontSize: 8.5,
    textAlign: 'left',
    color: '#333333',
    // fontFamily: 'Century Gothic',
  },
});

// AppRegistry.registerComponent('ActivityMain', () => ActivityMain_try);
