import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  ScrollView
} from 'react-native';
import {
    Card,
    List,
    ListItem,
    Button
} from 'react-native-elements';

import Header from './../../components/Header';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoEmbed from '../../components/VideoEmbed';
import CollapsibleCard from '../../components/CollapsibleCard';

const steps = [
  {step: 'How to:', stepDet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', stepNumber: 1},
  // {step: 'Set up:', stepDet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', stepNumber: 2},
]

export default class ActivityDetail extends Component {

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

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})
    this.state = {
      stepsDataSource: ds.cloneWithRows(steps)
    }
  }

  render() {
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{justifyContent: 'space-around'}}>
        <Text style={styles.welcome}>
          Bath Time
        </Text>

        <View style={styles.descriptionContainer}>
            <Image
                style={{ width: 80, height: 80, flex: 0.3, margin: 10, marginRight: 5}}
                source={require('../../img/bath.jpeg')} />

              <Text style={[styles.descriptionText, {flex: 0.7, margin: 10, marginLeft: 5}]}>
                {"Giving your dog a bath is an essential and excellent way to understand your dog's behaviour.\n\nBut remember even if they are babies, you can’t just toss them straight into the bathwater\
                (as apposed to throwing the baby out with the bathwater). You need a strategy, or a plan, or something to help you get those fluffy bundles of joy ready for a lifetime of enjoying a splash in the tub."}
              </Text>
        </View>

        <ListView
          dataSource={this.state.stepsDataSource}
          renderRow={(actStep) => {return this._renderActStepRow(actStep) }} />

        <VideoEmbed/>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('ActivityPrestart')}>
          <Text style={styles.textButtonStyle}>
            {"Next"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
  _renderActStepRow(actStep) {
    return(
      <CollapsibleCard style={styles.ActStepRow} title={actStep.step}>
        <Text style={styles.stepDesc}>{actStep.stepDet}</Text>
      </CollapsibleCard>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#5AC8B0',
    fontFamily: "Century Gothic"
 },
 descriptionContainer: {
   alignSelf: 'stretch',
   backgroundColor: '#FCFCFC',
   borderColor: '#F0F0F0',
   borderWidth: 1.5,
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'row'
 },
 descriptionText: {
   fontSize: 10,
   textAlign: 'left',
   color: '#333333',
   fontFamily: 'Century Gothic',
 },
 ActStepRow: {
  //  flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   height: 50,
   color: '#5AC8B0'
 },
 stepName: {
   marginLeft: 25,
   marginTop:0,
   justifyContent: 'center',
   alignItems: 'center',
   color: '#5AC8B0'
 },
 actStepMoreIcon: {
   color:'#F7C68F',
   height: 10,
   width: 10,
   marginRight: 25,
   fontWeight:'bold'
 },
 stepDesc: {
  marginLeft: 25,
  marginTop:0,
  fontFamily: 'Century Gothic',
  fontSize: 12,
  fontStyle: 'italic'
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

AppRegistry.registerComponent('ActivityDetail', () => ActivityDetail);
