import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        ListView,
        TouchableOpacity,
        Image,
        ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityDetail from './ActivityDetail';
import ActivityRecord from './ActivityRecord';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

export default class ActivityPrestart extends Component {

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
    const user = firebase.auth().currentUser;
    const userID = user ? user.uid : null;

    if(userID) {
      this.setState({
        userID: userID,
      });
    }

    firebase.database().ref('userDetails/' + userID + '/' + 'petDetails' + '/').once('value')
    .then((snap) => {
        // console.log('snap', snap.val().petName);
        this.setState({
          petName: snap.val().petName
        })

        // var items = [];
        // snap.forEach((child) => {
        //     items.push({
        //       title: child.val().title,
        //       category: child.val().category,
        //       desc: child.val().desc,
        //       steps: child.val().steps,
        //       video: child.val().video,
        //       imageurl: child.val().imageURL});
        // });

        // console.log('items', items);

        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(items)
        // });
    });
  }

  constructor(props){
      super(props);
      this._onPress = this._onPress.bind(this);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
  }

  render() {
    const {params} = this.props.navigation.state;
    const item = params.item;
    const userID = params.userID;
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
      <View style={styles.screenContainer}>
        
        {/* <Text style={styles.header}>Your goal is to give Peanut a bath today.</Text> */}
        {/* <Text style={styles.subheader}>{"Giving your dog a bath in an essential and excellent way to understand your dog's behavior."}</Text> */}
        <View style={styles.descriptionContainer}>
          <ImageBackground
            style={styles.image}
            source={{uri: item.imageurl}}>
            <View style={{justifyContent:'flex-end'}}>
              <Text style={styles.activityTitle}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* <TouchableOpacity onPress={this._onPress}>
          <Text style={styles.textlink}>Review training here.</Text>
        </TouchableOpacity> */}
        <Text style={styles.descriptionContainer}>
          Weekly goals with {this.state.petName}: April 15 - April 21, 2018
        </Text>

        <TouchableOpacity
          style={styles.startbutton}
          onPress={() => this.props.navigation.navigate('ActivityRecord', {item:item, userID:userID, petName:this.state.petName})}>
          <Text style={styles.startbuttontext}> </Text>
          <Text style={styles.startbuttontext}>START</Text>
          <Text style={styles.startbuttontext}> </Text>
        </TouchableOpacity>

        <Text style={[styles.subheader, {fontSize:18, textAlign:'center'}]}>
          {"Don't forget to take a photo!"}
        </Text>

      </View>
      </Drawer>
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
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: "Century Gothic"
  },
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
    height: 220,
    // alignSelf: 'center'
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
  },
  descriptionContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row'
  },
  activityTitle: {
    textAlign: 'center',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 15,
    opacity: 1,
    padding: 5,
    backgroundColor:'rgba(255,255,255,0.8)',
  },
  startbutton: {
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
  startbuttontext: {
    textAlign: 'center',
    color: 'white',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
});

AppRegistry.registerComponent('ActivityPrestart', () => ActivityPrestart);
