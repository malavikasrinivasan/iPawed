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
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

// const steps = [
//   {step: 'How to:', stepDet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', stepNumber: 1},
//   {step: 'Set up:', stepDet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', stepNumber: 2},
//   {step: 'Video:', stepDet: <VideoEmbed/>, stepNumber: 3}
// ]

export default class ActivityDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
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
      headerRight:
        <TouchableOpacity onPress={() => params.handleMenuToggle()}>
        <Image
          source={require("../../icon/menu.png")}
          style={{height:16, width:20, justifyContent:'center', margin:13}}/>
        </TouchableOpacity>
    }
  };

  state = {
    menuOpen: false
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  // constructor(props) {
  //   super(props)
  //   var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})
  //   this.state = {
  //     stepsDataSource: ds.cloneWithRows(steps)
  //   }
  // }

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
  }

  render() {
    const {params} = this.props.navigation.state;
    // stepsArr = [params.item.steps]

    console.log(params.item.steps)
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        side='right'
        content={<ControlPanel navigation={this.props.navigation}/>}
        captureGestures={true}
        acceptTap={true}
        tapToClose={true}
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.3}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentContainerStyle={{justifyContent: 'space-around'}}>
        <Text style={styles.welcome}>
          {params.item.title}
        </Text>

        <View style={styles.descriptionContainer}>
            <Image
                style={{ width: 80, height: 80, flex: 0.3, margin: 10, marginRight: 5}}
                source={{uri: params.item.imageurl}} />

              <Text style={[styles.descriptionText, {flex: 0.7, margin: 10, marginLeft: 5}]}>
                {params.item.desc}
              </Text>
        </View>

        <CollapsibleCard style={styles.ActStepRow} title="How to:" expanded={false}>
          <Text style={styles.stepDesc}>{params.item.steps}</Text>
        </CollapsibleCard>

        <CollapsibleCard style={styles.ActStepRow} title="Video:" expanded={false}>
          <Text style={styles.stepDesc}>
            <VideoEmbed uri = {params.item.video} />
          </Text>
        </CollapsibleCard>

        {/* {stepsArr.map((prop, key) => {
          return (
            <CollapsibleCard style={styles.ActStepRow}  key={key} title={key}>
            <Text style={styles.stepDesc}>{prop[0]}
            </Text>
            </CollapsibleCard>
          );
        })} */}

        {/* <CollapsibleCard style={styles.ActStepRow} title={actStep.step}>

        </CollapsibleCard> */}

        {/* <ListView
          dataSource={this.state.stepsDataSource}
          renderRow={(actStep) => {return this._renderActStepRow(actStep) }} /> */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('ActivityPrestart')}>
          <Text style={styles.textButtonStyle}>
            {"Next"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
      </Drawer>
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
    color: 'black',
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
   fontSize: 12,
   textAlign: 'left',
   color: '#333333',
   fontFamily: 'Century Gothic',
 },
 ActStepRow: {
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
