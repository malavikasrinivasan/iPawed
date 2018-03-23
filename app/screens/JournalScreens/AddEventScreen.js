import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS } from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

import Header from './../../components/Header';

export default class AddEventScreen extends Component {
  

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

  static navigationOptions = {
    title: 'AddEvent',
    headerStyle: {
      backgroundColor: '#5497A7',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.generalText}>
          Add a memory with Hobbes!
        </Text>
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
        <TextInput style = {styles.caption}
               underlineColorAndroid = "transparent"
               placeholder = "Caption"
               placeholderTextColor = "gray"
               multiline = {true}
               autoCapitalize = "none"
               onChangeText = {this.handleTitle}
               onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
        }}/>
        <TextInput style = {styles.description}
               underlineColorAndroid = "transparent"
               placeholder = "Description"
               placeholderTextColor = "gray"
               multiline = {true}
               autoCapitalize = "none"
               onChangeText = {this.handleTitle}
               onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
        }}/> 
        <View style={styles.dateContainer}>
          <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Date</Text>
          <DatePicker
          date={this.state.eventDate}
          mode="date"
          placeholder="Date"
          format="YYYY-MM-DD"
          minDate="2010-01-01"
          maxDate="2020-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={<Icon name="md-calendar" size = {24} color="#5497A7" />}
          customStyles={{
            dateInput: {
              borderWidth: 0
            },
            btnTextConfirm: {
              color: '#5497A7'
            },
            dateText: {
              color: '#5497A7'
            }
            
          }}
          onDateChange={(date) => {this.setState({eventDate: date})}}
          />
        </View>
        <View>
          <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Location</Text>
        </View>
        <View>
          <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Tags</Text>
          <View style ={styles.tagContainer}>
            <Button title="Happy" borderRadius={10} fontSize={12} backgroundColor='#5497A7' buttonStyle={styles.tagStyle}/>
            <Button title="Workout" borderRadius={10} fontSize={12} backgroundColor='gray' buttonStyle={styles.tagStyle}/>
            <Button title="Fun" borderRadius={10} fontSize={12} backgroundColor='gray' buttonStyle={styles.tagStyle}/>
            <Button title="Social" borderRadius={10} fontSize={12} backgroundColor='#5497A7' buttonStyle={styles.tagStyle}/>
            <Button title="Anxious" borderRadius={10} fontSize={12} backgroundColor='gray' buttonStyle={styles.tagStyle}/>
            <Button title="Tired" borderRadius={10} fontSize={12} backgroundColor='gray' buttonStyle={styles.tagStyle}/>
          </View>
        </View>
        <View style={styles.socialContainer}>
          <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Share</Text>
          <SocialIcon light type='facebook'/>
          <SocialIcon light type='instagram'/>
          <SocialIcon light type='twitter'/>
          <SocialIcon light type='medium'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  generalText: {
    fontFamily: 'Helvetica', 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#5497A7', 
    margin: 10
  },
  caption: {
      margin: 10,
      height: 30,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
  description: {
      margin: 10,
      height: 70,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
   uploadContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
   },
   avatarStyle: {
    margin: 20
   },
  dateContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
   },
   socialContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
   },
    tagContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
   },
   tagStyle: {
    marginRight: 0,
    marginTop: 0,
    marginBottom: 5,
    height: 10
   }

});
AppRegistry.registerComponent('AddEventScreen', () => AddEventScreen);
