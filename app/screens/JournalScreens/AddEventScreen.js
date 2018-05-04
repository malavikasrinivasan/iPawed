import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS, TouchableOpacity, Image, Alert} from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import Header from './../../components/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';

export default class AddEventScreen extends Component {

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

  constructor(props){
    super(props);

    this.state = {
      userID : null,
      eventTitle : '',
      eventNotes : '',
      eventLocation : '',
      eventDate : '',
      imageUrl : '',
      image: null,
      imageUpload: false,
      behavior1: false,
      behavior2: false,
      behavior3: false,
      behavior4: false,
      behavior5: false,
      menuOpen: false,
      memoryUpdate: true,
    };
    this.toggleB1 = this.toggleB1.bind(this);
    this.toggleB2 = this.toggleB2.bind(this);
    this.toggleB3 = this.toggleB3.bind(this);
    this.toggleB4 = this.toggleB4.bind(this);
    this.toggleB5 = this.toggleB5.bind(this);
    this._onCamPress = this._onCamPress.bind(this);
    this._onLibPress = this._onLibPress.bind(this);
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  toggleB1() {
    this.setState({behavior1: !this.state.behavior1});
  }

  toggleB2() {
    this.setState({behavior2: !this.state.behavior2});
  }

  toggleB3() {
    this.setState({behavior3: !this.state.behavior3});
  }

  toggleB4() {
    this.setState({behavior4: !this.state.behavior4});
  }

  toggleB5() {
    this.setState({behavior5: !this.state.behavior5});
  }

  componentDidMount(){

    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });

    const { params } = this.props.navigation.state;
    this.setState({
        userID: params.userID
    });
  }


  _onCamPress() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      includeBase64: true,
      cropping: true
    }).then(image => {
      // console.log(image);
      this.setState ({
        image: {uri: image.path, width: image.width, height: image.height, data: image.data},
        imageUpload: true
      })
    });
  }

  _onLibPress() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      includeBase64: true,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState ({
        image: {uri: image.path, width: image.width, height: image.height, data: image.data},
        imageUpload: true
      })
    });
  }

  validateInput = () => {

    emptyvals = []
    if(this.state.eventTitle == '') {
      emptyvals.push('Title')
    }
    if(this.state.eventDate == '') {
      emptyvals.push('Date')
    }
    if(!this.state.imageUpload) {
      emptyvals.push('Media')
    }
    if(this.state.behavior1 == false && this.state.behavior2 == false  && this.state.behavior3 == false  && this.state.behavior4 == false  && this.state.behavior5 == false) {
      emptyvals.push('Behaviors')
    }
    if(emptyvals.length == 0) {
      this.uploadMemory()
    }
    else {
      Alert.alert("Please enter " + emptyvals.join(", "))
    }

  }

  uploadMemory = () => {

    var memoryID = this.state.userID+"-"+Date.now();

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = firebase.storage().ref('images/'+this.state.userID+'/journalImages/').child(Date.now()+".jpeg")
    let mime = 'image/jpeg';

    const data = this.state.image.data;
    console.log(data);

    Blob.build(data,
      { type: `${mime};BASE64` }).then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      }).then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      }).then((url) => {
        this.setState({
          imageUrl: url
        })
      }). then(() => {
        firebase.database().ref('userDetails/'+ this.state.userID + '/journalDetails/'+ memoryID).set({
          eventTitle : this.state.eventTitle,
          eventDate : this.state.eventDate,
          eventLocation: this.state.eventLocation,
          eventNotes: this.state.eventNotes,
          imageURL: this.state.imageUrl,
          anxious: this.state.behavior1,
          aggressive: this.state.behavior2,
          calm: this.state.behavior3,
          excited: this.state.behavior4,
          affectionate: this.state.behavior5,
        }).then(() => {
          this.props.navigation.state.params.onNavigateBack(this.state.memoryUpdate);
          this.props.navigation.navigate('Timeline');
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  renderImage(image) {
    return <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={image} />
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
        <Text style={styles.welcomeText}>
          Record a memory!
        </Text>
        <TextInput
          multiline = {false}
          style = {styles.commenttext}
          placeholder="Title"
          placeholderTextColor="grey"
          onChangeText={eventTitle => this.setState({ eventTitle })}
          value={this.state.eventTitle}
        />

        <View style={styles.box}>
          <View style={{margin:10}}>
            <Text style={styles.subheader}>
              {"Media\n"}
            </Text>
            <View style = {styles.uploadContainer}>
              <View style={{flex:0.5}}>
                <TouchableOpacity onPress={this._onCamPress}>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image
                      source={require("../../icon/camera.png")}
                      style={{height: 25, width: 25, justifyContent: 'center'}}/>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.label, {fontSize: 10, textAlign: 'center'}]}>
                  {"Take photo"}
                </Text>
              </View>

              <View style={{flex:0.5}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  {this.state.image ? this.renderImage(this.state.image) : null}
                 </View>
              </View>

              <View style={{flex:0.5}}>
                <TouchableOpacity onPress={this._onLibPress}>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image
                      source={require("../../icon/plus.png")}
                      style={{height: 25, width: 25, justifyContent: 'center'}}/>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.label, {fontSize: 10, textAlign: 'center'}]}>
                  {"Upload from library"}
                </Text>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.dateContainer}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
            date={this.state.eventDate}
            mode="date"
            placeholder="Date"
            format="MMMM D, YYYY"
            minDate="2010-01-01"
            maxDate="2020-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconComponent={<Icon name="calendar" size = {24} color="gray" />}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              btnTextConfirm: {
                color: 'black',
                fontFamily: 'Century Gothic'
              },
              btnTextCancel: {
                color: 'black',
                fontFamily: 'Century Gothic'
              },
              dateText: {
                color: 'black',
                fontFamily: 'Century Gothic'
              },
              placeholderText: {
                color: 'lightgrey',
                fontFamily: 'Century Gothic'
              }

            }}
            onDateChange={(date) => {this.setState({eventDate: date})}}
            />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Location</Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            placeholderTextColor='lightgrey'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data, details);
              this.setState({
                eventLocation: data.description
              })
            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCYo6KjI8l0Dk_nx-P4w3T_UOUKFyygMXc',
              language: 'en', // language of the results
              types: '(regions)' // default: 'geocode'
            }}

            value={this.state.eventLocation}

            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0
              },
              description: {
                fontWeight: 'bold'
              },
              textInput: {
                color: 'black',
                fontSize: 14,
                fontFamily:'Century Gothic'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}

            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          />

        </View>

        <View style={{borderColor: '#E0E0E0', borderWidth: 1, alignSelf:'stretch', marginBottom:10, backgroundColor:'#E0E0E0'}}/>

        <View>
          <Text style={styles.subheader}>Behavior tags:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{margin:10}}>
             <TouchableOpacity onPress={this.toggleB3}>
               <View style={[styles.behavior, {backgroundColor:'#8FBAEC'}, this.state.behavior3 && styles.bSelect]}/>
             </TouchableOpacity>
             <Text style={styles.tagtext}>Content</Text>
            </View>
            <View style={{margin:10}}>
             <TouchableOpacity onPress={this.toggleB1}>
               <View style={[styles.behavior, {backgroundColor:'gold'}, this.state.behavior1 && styles.bSelect]}/>
             </TouchableOpacity>
             <Text style={styles.tagtext}>Anxious</Text>
            </View>

            <View style={{margin:10}}>
             <TouchableOpacity onPress={this.toggleB5}>
               <View style={[styles.behavior, {backgroundColor:'plum'}, this.state.behavior5 && styles.bSelect]}/>
             </TouchableOpacity>
             <Text style={styles.tagtext}>Affectionate</Text>
            </View>

            <View style={{margin:10}}>
             <TouchableOpacity onPress={this.toggleB2}>
               <View style={[styles.behavior, {backgroundColor:'indianred'}, this.state.behavior2 && styles.bSelect]}/>
             </TouchableOpacity>
             <Text style={styles.tagtext}>Aggressive</Text>
            </View>

            <View style={{margin:10}}>
             <TouchableOpacity onPress={this.toggleB4}>
               <View style={[styles.behavior, {backgroundColor:'#B8E986'}, this.state.behavior4 && styles.bSelect]}/>
             </TouchableOpacity>
             <Text style={styles.tagtext}>Excited</Text>
            </View>
          </View>
         </View>

         <View style={styles.box}>
           <View style={styles.commentbox}>
              <TextInput
                multiline = {true}
                numberOfLines = {4}
                style = {styles.commenttext}
                placeholder="Notes"
                placeholderTextColor="grey"
                onChangeText={eventNotes => this.setState({ eventNotes })}
                value={this.state.eventNotes}
              />
          </View>
        </View>

        <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.deletebutton}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.deletebuttontext}> </Text>
          <Text style={styles.deletebuttontext}>DELETE</Text>
          <Text style={styles.deletebuttontext}> </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.savebutton}
          onPress={this.validateInput}>
          <Text style={styles.savebuttontext}> </Text>
          <Text style={styles.savebuttontext}>SAVE</Text>
          <Text style={styles.savebuttontext}> </Text>
        </TouchableOpacity>
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
    margin: 10
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
    margin: 10,
    color: 'black',
    fontSize: 14,
    fontFamily:'Century Gothic'
  },
  box: {
    alignItems: 'stretch',
    backgroundColor: '#F6F6F6',
    borderColor: '#E0E0E0',
    borderWidth: 1.5
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
   },
   tagStyle: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10,
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
  },
  behavior: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 0,
    margin: 5,
    opacity: 0.3
  },
  bSelect: {
    borderWidth: 1,
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
    height: 70,
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
});
