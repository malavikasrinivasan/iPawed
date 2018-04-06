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
  Image
} from 'react-native';
import { Card, 
  ListItem, 
  Button 
} from 'react-native-elements';

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
        <View>
        <Text style={styles.welcome1}>
          Recommended Activities for you
        </Text>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../img/bath.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Bath Time
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    Giving your dog a bath is an essential and excellent way to understand your dogs behaviour.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../img/fetch.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Playtime
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                Toys and play are essential before you even get your pet into the tub. Play with them in the bathroom and bring in their favorite toys. Basically, you\'re teaching them the bathroom is not a scary place.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../img/bath.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Water Wings
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                We're not saying you need those floaty devices that are so popular in teaching the young to swim.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../img/fetch.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Bubble Bubble
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                Fortunately, no toil and trouble this time. But we will the best way to make bath time fun is getting your pet high-quality shampoos, conditioners, and spritzers...
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
      </View>
        {/* <HorActCards style={{marginBottom:10}}/> */}
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
  welcome1: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 0,
    color: '#62BEC1'
  },
});

AppRegistry.registerComponent('ActivityMain', () => ActivityMain);