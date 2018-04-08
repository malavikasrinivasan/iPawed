import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

import Header from './../../components/Header';

export default class AddEventScreen extends Component {

  static navigationOptions = {
    title: 'Timeline',
     tabBarIcon: ({tintColor}) => (
        <Icon name="heart" size={24} color={tintColor} />
      ),
      headerTintColor: 'black',
      headerTitleStyle: {
        fontFamily: 'SignPainter',
        fontSize: 28
      },
  };

  state = {
    eventTitle : '',
    description : '',
    eventDate : new Date()
  }

  handleTitle = (text) => {
    this.setState({eventTitle : text})
  }
  handleDescription = (text) => {
    this.setState({description : text})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.uploadContainer}>
          <Avatar containerStyle = {styles.avatarStyle}
            large
            rounded
            icon={{type: 'ionicon', name: 'ios-camera'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Avatar containerStyle = {styles.avatarStyle}
            large
            rounded
            icon={{type: 'ionicon', name: 'ios-images'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
        <View style={styles.commentbox}>
           <TextInput
             multiline = {true}
             numberOfLines = {4}
             style = {styles.commenttext}
             placeholder="Caption"
             placeholderTextColor="grey"
           />
         </View>

        <View style={styles.dateContainer}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
            date={this.state.eventDate}
            mode="date"
            placeholder="Date"
            format="YYYY-MM-DD"
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
              }

            }}
            onDateChange={(date) => {this.setState({eventDate: date})}}
            />
          </View>

        <Text style = {styles.label}>Location</Text>

        <View style={[styles.commentbox, {height: 100}]}>
           <TextInput
             multiline = {true}
             numberOfLines = {4}
             style = {styles.commenttext}
             placeholder="Notes"
             placeholderTextColor="grey"
           />
         </View>

        <View>
          <Text style={styles.subheader}>Behavior tags:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
             <TouchableOpacity onPress={this.behavior1} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#D3B69B'}]}/>
               <Text style={styles.tagtext}>Calm</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior2} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#163250'}]}/>
               <Text style={styles.tagtext}>Fearful</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior3} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#F7C68F'}]}/>
               <Text style={styles.tagtext}>Happy</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior4} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#CC2539'}]}/>
               <Text style={styles.tagtext}>Joyful</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this.behavior5} style={{margin:10}}>
               <View style={[styles.behavior, {backgroundColor:'#F9D64B'}]}/>
               <Text style={styles.tagtext}>Mellow</Text>
             </TouchableOpacity>
          </View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  generalText: {
    fontFamily: 'Century Gothic',
    fontSize: 28,
    color: 'black',
    margin: 10
  },
  subheader: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Century Gothic',
    paddingBottom: 5,
    textAlign: 'center'
  },
  caption: {
      margin: 10,
      height: 30,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
  label: {
    margin: 10,
    color: 'black',
    fontSize: 14,
    fontFamily:'Century Gothic'
  },
  description: {
      margin: 10,
      height: 100,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
   uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
   },
   avatarStyle: {
    margin: 0
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
    backgroundColor: '#F0F0F0',
    height: 50,
    alignSelf: 'stretch',
    margin: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.5
  },
  commenttext: {
    color: 'black',
    fontSize: 14,
    margin: 4,
    fontFamily: 'Century Gothic'
  },
});
