import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS, TouchableOpacity, Image } from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Header from './../../components/Header';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

export default class ViewEventScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
       title: 'Timeline',
       tabBarIcon: ({tintColor}) => (
          <Icon name="heart" size={24} color={tintColor} />
        ),
        headerTintColor: '#5AC8B0',
        headerBackTitle: 'back',
        headerBackTitleStyle: {
          fontFamily: 'Century Gothic'
        },
        headerTitleStyle: {
          fontFamily: 'Century Gothic',
          fontSize: 22,
          color: 'black',
          fontWeight: 'normal'
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
    eventTitle : '',
    description : '',
    eventDate : '',
    eventLocation: '',

    notesText: '',
    menuOpen: false
  }

  handleTitle = (text) => {
    this.setState({eventTitle : text})
  }
  handleDescription = (text) => {
    this.setState({description : text})
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  };

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
  }

    renderBehaviors(behaviors_on) {
      const circles = [];

      behaviors_on.map(behavior =>
        // console.log(behavior);
        circles.push(
          <View>
          <View style={[styles.behaviorCircle, {backgroundColor:behavior.color}]}/>
            <Text style={styles.tagtext}>{behavior.name}</Text>
          </View>
        )
      )
    return circles
  }

  render() {
    const {params} = this.props.navigation.state;
    console.log(params);

    var behaviors_on = []
    if(params.eventData.anxious == true) {
      behaviors_on.push({name : "Anxious", color: "#78037c"})
    }
    if(params.eventData.aggressive == true) {
      behaviors_on.push({name : "Aggressive", color: "#CC2539"})
    }
    if(params.eventData.calm == true) {
      behaviors_on.push({name : "Content", color: "#6592CC"})
    }
    if(params.eventData.excited == true) {
      behaviors_on.push({name : "Excited", color: "#5AC8B0"})
    }
    if(params.eventData.affectionate == true) {
      behaviors_on.push({name : "Affectionate", color: "#fca903"})
    }

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
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text style={[styles.welcomeText, {alignSelf: 'center'}]}>
            {params.eventData.title}
          </Text>
        </View>
        <Image
          style={styles.image}
          source={{uri: params.eventData.imageUrl}}
          resizeMode="contain"
        />
        <View style = {styles.uploadContainer}>
          <Text style={styles.label}> {params.eventData.time} </Text>
          <Text style={styles.label}> {params.eventData.location} </Text>
        </View>
         <View style={styles.box}>
           <View style={styles.commentbox}>
              <Text style={styles.subheader}>Your notes:</Text>
              <Text style={styles.commenttext}>
                {params.eventData.description}
              </Text>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin:10}}>
             {behaviors_on ? this.renderBehaviors(behaviors_on) : null}
          </View>
         </View>

      </View>
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  welcomeText: {
    color: 'black',
    fontSize: 26,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    marginTop: 10,
  },
  generalText: {
    fontFamily: 'Century Gothic',
    fontSize: 28,
    color: 'black'
  },
  subheader: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Century Gothic',
    paddingBottom: 5,
    marginTop: 7,
    textAlign: 'center'
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontFamily:'Century Gothic'
  },
  box: {
    alignItems: 'stretch',
    backgroundColor: '#F6F6F6',
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
    marginTop: 10
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   },
   submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
   },
  dateContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
   },
  tagContainer: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
   },
   tagStyle: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10,
  },
  behavior: {
    width: 40,
    height: 40,
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
  commentbox: {
    height: 80,
    alignSelf: 'stretch',
    margin: 8,
    marginTop: 2
  },
  commenttext: {
    color: 'black',
    opacity: 0.8,
    fontSize: 14,
    margin: 4,
    fontFamily: 'Century Gothic',
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  behaviorCircle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 5,
    opacity: 0.8
  },
  tagtext: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});
