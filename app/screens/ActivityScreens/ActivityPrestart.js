import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        ListView,
        TouchableOpacity,
        Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityDetail from './ActivityDetail'
import ActivityRecord from './ActivityRecord'

export default class ActivityPrestart extends Component {

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

  constructor(props){
      super(props);
      this._onPress = this._onPress.bind(this);
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

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('ActivityRecord')}>
          <Text style={styles.textButtonStyle}>
            {"Next"}
          </Text>
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
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    textAlign: 'center'
  },
  subheader: {
    color: 'black',
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
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 14,
    textAlign: 'center'
  },
  buttonStyle: {
    width: 130,
    backgroundColor: '#5AC8B0',
    borderRadius: 7,
    shadowOffset:{height: 2},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    alignSelf: 'center',
    margin: 10
  },
  textButtonStyle: {
    margin: 8,
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontFamily: 'Century Gothic'
  }
});

AppRegistry.registerComponent('ActivityPrestart', () => ActivityPrestart);
