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

const steps = [
  {step: 'Playtime', stepNumber: 1},
  {step: 'Water Temperature', stepNumber: 2},
  {step: 'Water Wings', stepNumber: 3},
  {step: 'Bubble, Bubble', stepNumber: 4},
  {step: 'Treat Time', stepNumber: 5}
]

export default class ActivityDetail extends Component {

  static navigationOptions = {
    title: 'Activity Steps',
    headerStyle: {
      backgroundColor: '#5497A7',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
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
      <ScrollView>
        <Card
          title='BATH TIME'
          image={require('../../img/bath.jpg')}
          containerStyle={{backgroundColor:'#738496'}} />
        <Text style={styles.welcome}>
            STEPS:
        </Text>
        <ListView
          dataSource={this.state.stepsDataSource}
          renderRow={(actStep) => {return this._renderActStepRow(actStep) }} />
        <VideoEmbed />
        <Button
            // icon={{name: 'code'}}
            backgroundColor='#F7C68F'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 20}}
            title='START ACTIVITY' 
            onPress={() => this.props.navigation.goBack()} />
      </ScrollView>
    );
  }
  _renderActStepRow(actStep) {
    return(
      <TouchableOpacity style={styles.ActStepRow}>
        <Text style={styles.stepName}>{`${_.capitalize(actStep.step)}`}</Text>
        <View style={{flex:1}} />
        <Icon name='chevron-right' size={10} style={styles.actStepMoreIcon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
  fontSize: 24,
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 20
 },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 ActStepRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   height: 50
 },
 stepName: {
   marginLeft: 25,
   marginTop:0
 },
 actStepMoreIcon: {
   color:'#F7C68F',
   height: 10,
   width: 10,
   marginRight: 25
 }
});

AppRegistry.registerComponent('ActivityDetail', () => ActivityDetail);
