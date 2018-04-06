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
        <Text style={styles.welcome}>
          Bath Time
        </Text>
        <Card>
          <View style={{flex: 1, flexDirection:'row'}}>
            <Image
                style={{ width: 80, height: 80 }}
                source={require('../../img/bath.jpeg')} />
            <View style={{flex: 4, alignItems:'center', justifyContent:'center'}}>
              <Text>
                Giving your dog a bath is an essential and excellent way to understand your dog's behaviour. 
                
                But remember even if they are babies, you can’t just toss them straight into the bathwater (as apposed to throwing the baby out with the bathwater). You need a strategy, or a plan, or something to help you get those fluffy bundles of joy ready for a lifetime of enjoying a splash in the tub.
              </Text>
            </View>
          </View>
        </Card>
        {/* <Text style={styles.welcome}>
            STEPS:
        </Text> */}
        <ListView
          dataSource={this.state.stepsDataSource}
          renderRow={(actStep) => {return this._renderActStepRow(actStep) }} />
        <VideoEmbed />
        <Button
            // icon={{name: 'code'}}
            round
            backgroundColor='#62BEC1'
            // buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 20}}
            title='Start' 
            onPress={() => this.props.navigation.navigate('ActivityPrestart')} />
      </ScrollView>
    );
  }
  _renderActStepRow(actStep) {
    return(
      <CollapsibleCard style={styles.ActStepRow} title={actStep.step}>
        <Icon name='chevron-right' size={10} style={styles.actStepMoreIcon} />
        <Text style={styles.stepDesc}>{actStep.stepDet}</Text>
        <View style={{flex:1}} />
      </CollapsibleCard>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
  fontSize: 18,
  textAlign: 'center',
  marginTop: 20,
  color: '#62BEC1'
 },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 ActStepRow: {
  //  flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   height: 50,
   color: '#62BEC1'
 },
 stepName: {
   marginLeft: 25,
   marginTop:0,
   justifyContent: 'center',
   alignItems: 'center',
   color: '#62BEC1'
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
  marginTop:0
 }
});

AppRegistry.registerComponent('ActivityDetail', () => ActivityDetail);
