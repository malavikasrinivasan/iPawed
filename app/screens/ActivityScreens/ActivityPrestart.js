import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        ListView,
        TouchableOpacity,
        Image} from 'react-native';
import ActivityDetail from './ActivityDetail'
import ActivityRecord from './ActivityRecord'

export default class ActivityPrestart extends Component {
  constructor(props){
      super(props);
      this._onPress = this._onPress.bind(this);
      this._onRightButtonPress = this._onRightButtonPress.bind(this);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.header}>Your goal is to give Peanut a bath today.</Text>
        <Text style={styles.subheader}>{"Giving your dog a bath in an essential and excellent way to understand your dog's behavior."}</Text>

        <Image
          style={styles.image}
          source={require('./../../img/bathtime.jpg')}
        />

        <TouchableOpacity onPress={this._onPress}>
          <Text style={styles.textlink}>Review training here.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startbutton} onPress={this._onRightButtonPress}>
          <Text style={styles.buttontext}> </Text>
          <Text style={styles.buttontext}>NEXT</Text>
          <Text style={styles.buttontext}> </Text>
        </TouchableOpacity>

        <Text style={[styles.subheader, {fontSize:18, textAlign:'center'}]}>
          {"Don't forget to take a photo!"}
        </Text>

      </View>
    );
  }
  _onPress() {
    this.props.navigation.navigate('ActivityDetail');
  }

  _onRightButtonPress() {
    this.props.navigation.navigate('ActivityRecord');
  }

  _onLeftButtonPress() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  header: {
    color: '#163250',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    textAlign: 'center'
  },
  subheader: {
    color: '#163250',
    fontFamily: 'Century Gothic',
    fontSize: 12,
    margin: 15,
    textAlign: 'left'
  },
  image: {
    width: 380,
    height: 250,
    alignSelf: 'center'
  },
  textlink: {
    color: '#163250',
    fontFamily: 'Century Gothic',
    fontSize: 14,
    textAlign: 'center'
  },
  startbutton: {
     width: 60,
     height: 60,
     alignSelf: 'center',
     backgroundColor: '#5AC8B0',
     borderRadius: 100,
     shadowOffset:{height: 3},
     shadowColor: 'grey',
     shadowOpacity: 1.0
  },
  buttontext: {
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    color: 'white',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16
  }
});

AppRegistry.registerComponent('ActivityPrestart', () => ActivityPrestart);
