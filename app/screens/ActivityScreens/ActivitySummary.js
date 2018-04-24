import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        TouchableOpacity,
        Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Stopwatch} from 'react-native-stopwatch-timer';
import TimelineScreen from '../JournalScreens/TimelineScreen';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

export default class ActivitySummary extends Component {

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

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
  }

  constructor(props){
      super(props);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
      this.duration = props.duration;
      this.currentTime = props.currentTime;
  }

  render(){
      return(
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
      <View style={styles.screenContainer}>
          <View>
            <Text style={styles.header}>TIME</Text>
            <Stopwatch laps start={this.currentTime}
              reset={false}
              options={options}
              getTime={this.currentTime} />
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>ACTIVITY</Text>
                <Text style={styles.subheader}>Bath time</Text>
              </View>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>DISTANCE</Text>
                <Text style={styles.subheader}>N/A</Text>
              </View>
            </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View>
            <Text style={styles.header}>GOAL</Text>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View style={styles.completedgoal}/>
              <View style={styles.completedgoal}/>
              <View style={styles.remaininggoal}/>
            </View>
            <Text style={styles.subheader}>
              {"\nYou've completed 2 of 3 Activities this week.\nKeep it up!"}
            </Text>

            <Text style={[styles.subheader,{fontSize:10, fontStyle:'italic'}]}>
              {"\nExperts recommend that you do a physical activity\nwith your pet several times a week."}
            </Text>
          </View>


          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
          <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.deletebutton}
            onPress={() => this.props.navigation.navigate('Timeline')}>
            <Text style={styles.deletebuttontext}> </Text>
            <Text style={styles.deletebuttontext}>DELETE</Text>
            <Text style={styles.deletebuttontext}> </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.savebutton}
            onPress={() => this.props.navigation.navigate('Timeline')}>
            <Text style={styles.savebuttontext}> </Text>
            <Text style={styles.savebuttontext}>SAVE</Text>
            <Text style={styles.savebuttontext}> </Text>
          </TouchableOpacity>
          </View>
        </View>
        </Drawer>
      );
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
      fontSize: 18,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    subheader: {
      color: 'black',
      fontSize: 15,
      fontFamily: 'Century Gothic',
      paddingBottom: 5,
      textAlign: 'center'
    },
    completedgoal: {
      backgroundColor:'#5AC8B0',
      width: 50,
      height: 50,
      alignSelf: 'center',
      borderRadius: 100,
      margin: 5,
      opacity: 0.8
    },
    remaininggoal: {
      backgroundColor:'white',
      width: 50,
      height: 50,
      alignSelf: 'center',
      borderColor: 'black',
      borderRadius: 100,
      borderWidth: 1,
      margin: 5,
      opacity: 0.8
    },
    tagtext: {
      color: 'black',
      fontSize: 11,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      fontStyle: 'italic'
    },
    submitContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center',
     margin: 10
    },
    deletebutton: {
       width: 60,
       height: 60,
       alignSelf: 'center',
       backgroundColor: 'white',
       borderRadius: 100,
       margin: 2,
       shadowOffset:{height: 3},
       shadowColor: 'grey',
       shadowOpacity: 1.0
    },
    savebutton: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      backgroundColor: '#5AC8B0',
      borderRadius: 100,
      margin: 5,
      shadowOffset:{height: 3},
      shadowColor: 'grey',
      shadowOpacity: 1.0
    },
    deletebuttontext: {
      textAlign: 'center',
      color: 'black',
      flexDirection: 'column',
      flex: 1,
      fontSize: 16,
      fontFamily: 'Century Gothic'
    },
    savebuttontext: {
      textAlign: 'center',
      color: 'white',
      flexDirection: 'column',
      flex: 1,
      fontSize: 16,
      fontFamily: 'Century Gothic'
    }
  })

  const options = {
    text: {
      fontSize: 50,
      fontFamily: 'Century Gothic',
      color: 'black',
      textAlign: 'center'
    }
  };

AppRegistry.registerComponent('ActivitySummary', () => ActivitySummary);
