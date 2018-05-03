import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';

export default class GetPetDetails extends Component {

  static navigationOptions = {
    title: 'Peternal',
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

  constructor(props){
    super(props);

    this.state = {
      userID:'',
      userName:'',
      petName : '',
      petBreed : '',
      petWeight: '',
      petGender: '',
      petAdoptionDate : null,
      petBirthDay : null,
      image: null,
      imageUpload: false,
      petPic: null,
      color1: false,
      color2: false,
      color3: false,
      color4: false,
      color5: false
    };
    this.toggleC1 = this.toggleC1.bind(this);
    this.toggleC2 = this.toggleC2.bind(this);
    this.toggleC3 = this.toggleC3.bind(this);
    this.toggleC4 = this.toggleC4.bind(this);
    this.toggleC5 = this.toggleC5.bind(this);
    this._onCamPress = this._onCamPress.bind(this);
    this._onLibPress = this._onLibPress.bind(this);
  }

  toggleC1() {
    this.setState({color1: !this.state.color1});
  }

  toggleC2() {
    this.setState({color2: !this.state.color2});
  }

  toggleC3() {
    this.setState({color3: !this.state.color3});
  }

  toggleC4() {
    this.setState({color4: !this.state.color4});
  }

  toggleC5() {
    this.setState({color5: !this.state.color5});
  }

  componentDidMount(){
      const { params } = this.props.navigation.state;
      const userID = params ? params.userID : null;
      const userName = params ? params.userName : null;
      this.setState({
          userID: params.userID,
          userName: params.userName
      });
  }

  _onCamPress() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      includeBase64: true,
      cropping: true,
      compressImageQuality: 0.25
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
      // width: 100,
      // height: 100,
      includeBase64: true,
      // cropping: true,
      compressImageQuality: 0.25
    }).then(image => {
      // console.log(image);
      this.setState ({
        image: {uri: image.path, width: image.width, height: image.height, data: image.data},
        imageUpload: true
      })
    });
  }

  uploadPetProfile() {
    if (this.state.petName == ''
      || this.state.petBreed == ''
      || this.state.petWeight == ''
      || this.state.petGender == ''
      || this.state.petAdoptionDate == null
      || this.state.petBirthDay == null
      || this.state.imageUpload == false
      ||  (!this.state.color1
        && !this.state.color2
        && !this.state.color3
        && !this.state.color4
        && !this.state.color5)
    ){
      alert("Please fill all fields (guessing is fine!)")
      return
    }

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = firebase.storage().ref('images/'+this.state.userID+'/').child("profilePic.jpg")
    let mime = 'image/jpeg';

    const data = this.state.image.data;
    // console.log(data);

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
        firebase.database().ref('userDetails/'+ this.state.userID + '/petDetails').set({
          petName : this.state.petName,
          petBreed : this.state.petBreed,
          color1: this.state.color1,
          color2: this.state.color2,
          color3: this.state.color3,
          color4: this.state.color4,
          color5: this.state.color5,
          petWeight: this.state.petWeight,
          petGender: this.state.petGender,
          petAdoptionDate : this.state.petAdoptionDate,
          petBirthDay : this.state.petBirthDay,
          petPic: this.state.imageUrl
        }).then(() => {
          this.props.navigation.navigate('OnboardingQ1', {
          userID: this.state.userID,
          userName: this.state.userName
        });
        }).catch((error) => {
          alert(error)
      }).catch((error) => {
        alert(error)
      });
    });
  }

  renderImage(image) {
    return <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={image} />
  }

  render() {
    // console.log(this.state.image)
    return (
      <View style={styles.screenContainer}>

        <View style = {styles.uploadContainer}>
          <View style={{flex:0.5, justifyContent: 'center', alignSelf:'center'}}>
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

          <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              {this.state.image ? this.renderImage(this.state.image) : null}
             </View>
          </View>

          <View style={{flex:0.5, justifyContent: 'center', alignSelf:'center'}}>
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

        <View style={styles.formContainer}>
          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Name: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="name"
              placeholderTextColor='lightgrey'
              autoCorrect= {false}
              onChangeText={petName => this.setState({ petName })}
              value={this.state.petName}
              />

          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Breed: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="breed"
              placeholderTextColor='lightgrey'
              autoCorrect={false}
              onChangeText={petBreed => this.setState({ petBreed })}
              value={this.state.petBreed}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Color: "
              placeholderTextColor='black'
              editable={false}/>
            <View style={{justifyContent:'center', flex:0.5}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', justifyContent:'space-between'}}>
                 <TouchableOpacity onPress={this.toggleC1}>
                   <View style={[styles.colorTags, {backgroundColor:'black'}, this.state.color1 && styles.cSelect]}/>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.toggleC2}>
                   <View style={[styles.colorTags, {backgroundColor:'brown'}, this.state.color2 && styles.cSelect]}/>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.toggleC3}>
                   <View style={[styles.colorTags, {backgroundColor:'beige'}, this.state.color3 && styles.cSelect]}/>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.toggleC4}>
                   <View style={[styles.colorTags, {backgroundColor:'grey'}, this.state.color4 && styles.cSelect]}/>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={this.toggleC5}>
                   <View style={[styles.colorTags, {backgroundColor:'tan'}, this.state.color5 && styles.cSelect]}/>
                 </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Weight: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="weight (lbs)"
              placeholderTextColor='lightgrey'
              autoCorrect={false}
              keyboardType='numeric'
              onChangeText={petWeight => this.setState({ petWeight })}
              value={this.state.petWeight}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Gender: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="male/female"
              placeholderTextColor='lightgrey'
              autoCapitalize='none'
              onChangeText={petGender => this.setState({ petGender })}
              value={this.state.petGender}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.40}}
              placeholder={"Adoption Date: "}
              placeholderTextColor='black'
              editable={false}/>
            <DatePicker
              date={this.state.petAdoptionDate}
              mode="date"
              placeholder="yyyy-mm-dd"
              format="YYYY-MM-DD"
              minDate="2010-01-01"
              maxDate="2020-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                flex:0.5,
                alignContent:'flex-start'
              }}
              showIcon={false}
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
                  fontFamily: "Century Gothic",
                  fontWeight:'bold',
                  color: 'lightgrey'
                }
              }}
              onDateChange={(date) => {this.setState({petAdoptionDate: date})}}
            />
          </View>

            <View style={styles.formTextInput}>
              <View style={{flex:0.41}}>
                <Text style={{fontFamily: "Century Gothic", color:'black'}}>
                  {"Birthday: "}
                </Text>
                <Text style={{fontSize:10, fontFamily:"Century Gothic"}}>
                  {"(if you're not sure, guess)"}
                </Text>
              </View>

              <View style={{flex:0.5, alignContent:'flex-start'}}>
              <DatePicker
                date={this.state.petBirthDay}
                mode="date"
                placeholder="yyyy-mm-dd"
                format="YYYY-MM-DD"
                minDate="2010-01-01"
                maxDate="2020-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
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
                    fontFamily: "Century Gothic",
                    fontWeight:'bold',
                    color: 'lightgrey'
                  }
                }}
                onDateChange={(date) => {this.setState({petBirthDay: date})}}
              />
            </View>
          </View>
        </View>
        <View style = {{flex: 0.2, justifyContent: 'center', alignSelf:'center'}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ () => this.uploadPetProfile() }>
            <Text style={styles.textButtonStyle}>
              Create profile
            </Text>
          </TouchableOpacity>
        </View>    
      </View>
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
    textAlign: 'center'
  },
  formContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTextInput: {
    flexDirection: 'row',
    height: 35,
    width: 300
  },
  buttonStyle: {
    width: 130,
    backgroundColor: '#5AC8B0',
    borderRadius: 7,
    shadowOffset:{height: 2},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2
  },
  textButtonStyle: {
    margin: 8,
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontFamily: 'Century Gothic'
  },
  addimg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    borderRadius: 7
  },
  addbuttontext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontFamily: 'Century Gothic',
  },
  plustext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    fontFamily: 'Century Gothic',
  },
  colorTags: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 0,
    opacity: 0.3
  },
  cSelect: {
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
  uploadContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'center'
   },
  label: {
    margin: 10,
    color: 'black',
    fontSize: 14,
    fontFamily:'Century Gothic'
  },
});
