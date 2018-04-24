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
    eventTitle : 'Peanut Goes to the Vet!',
    description : '',
    eventDate : new Date(),
    notesText: 'Today, Peanut went to the vet to get his second round of shots. He did well and also met some other huskies! What a good doggo!',
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

  render() {
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
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={styles.welcomeText}>
            {this.state.eventTitle}
          </Text>
          <View>
            <Icon name="edit" size={20} color="black" style={{margin: 10}}
            onPress={() => this.props.navigation.navigate('AddEvent')}/>
          </View>

        </View>
        <Image
          style={styles.image}
          source={require('./../../img/vet.png')}
          resizeMode="contain"
        />
        <View style = {styles.uploadContainer}>
          <Text style={styles.label}> April 15, 2018 </Text>
          <Text style={styles.label}> Berkeley, CA </Text>
        </View>
         <View style={styles.box}>
           <View style={styles.commentbox}>
              <Text style={styles.subheader}>Notes:</Text>
              <Text style={styles.commenttext}>
                {this.state.notesText}
              </Text>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
             <TouchableOpacity onPress={this.behavior1} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#D3B69B'}]}/>
               <Text style={styles.tagtext}>Calm</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior3} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#F7C68F'}]}/>
               <Text style={styles.tagtext}>Happy</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior4} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#CC2539'}]}/>
               <Text style={styles.tagtext}>Joyful</Text>
             </TouchableOpacity>

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
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SignPainter',
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
    height: 90,
    alignSelf: 'stretch',
    margin: 8,
    marginTop: 2
  },
  commenttext: {
    color: 'black',
    fontSize: 14,
    margin: 4,
    fontFamily: 'Century Gothic'
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  }
});
