import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity, ActivityIndicator, Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../../components/Header';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

export default class GetPetDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={24} color={tintColor}/>
        ),
      title: 'Home',
      headerBackTitle: 'back',
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: 'SignPainter',
        fontSize: 28
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
    userID:'',
    userName:'',
    userDetails: null,
    imageUrl: null,
    menuOpen: false
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  getUserData(userID){
    firebase.database().ref('userDetails/' + userID + '/').once('value')
    .then((snapshot) => {
      this.setState({
        userDetails: snapshot.val()
      });
      // console.log(snapshot.val())
    })
    .catch((error) => {
      alert("Error")
    })

  }


  uploadImage(){

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child("test.jpg")
    let mime = 'image/jpeg'


    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.2
    }).then(imageObj => {
      console.log(imageObj);
      const data = imageObj.data

      Blob.build(data, { type: `${mime};BASE64` })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log(url);
        this.setState({
          imageUrl: url
        })
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
    const firebaseConfig = {
      apiKey: "AIzaSyALmeSOsC45vPnU3UmqEAzIhs_WgVX6NY8",
      authDomain: "ipawedmims18.firebaseapp.com",
      databaseURL: "https://ipawedmims18.firebaseio.com",
      projectId: "ipawedmims18",
      storageBucket: "ipawedmims18.appspot.com",
      messagingSenderId: "828598628543"
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const { params } = this.props.navigation.state;
    const userID = params ? params.userID : null;
    const userName = params ? params.userName : null;
    if(userID) {
      this.setState({
        userID: params.userID,
        userName: params.userName
      });
      this.getUserData(userID)
    }

  }

  render() {

    if (!this.state.userDetails) {
      return (
        <ActivityIndicator size='large' />
        );
    }
    // console.log(this.state.userDetails)
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
        <Text style={styles.welcomeText}>
          Welcome {this.state.userName}
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => this.uploadImage()}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image
                source={require("../../icon/plus.png")}
                style={{height:25, width:25, justifyContent:'center', margin:13}}/>
            </View>
          </TouchableOpacity>

          <Text style={{fontFamily:'Century Gothic'}}>
            Memories with Peanut!
          </Text>
        </View>
        {this.state.imageUrl ?
        <Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.imageUrl}}
        /> : null
        }
      </View>
      </Drawer>
    );
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
  welcomeText: {
    color: 'black',
    fontSize: 30,
    margin: 15,
    textAlign: 'center',
    fontFamily: "Century Gothic"
  }
});
