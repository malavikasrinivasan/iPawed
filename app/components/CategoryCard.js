import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Card,
    ListItem,
    Button
  } from 'react-native-elements';

//   const navigation = this.props.navigation;

export default class CategoryCard extends Component {
	render() {
        const item = this.props.item
        const userID = this.props.userID
        console.log(item)
        console.log("Image",this.props.item.imageurl)
		return (
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems:'center'}} onPress={() => this.props.navigation.navigate('ActivityCategory', {item:item, userID:userID})}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={[styles.catImage, {backgroundColor:'black', opacity:1}]}/>
                            <Image source={{uri: item.imageurl}} style={[styles.catImage, {position:'absolute'}]}/>
                            <View style={styles.catInnerCirc}/>
                            <Text style={styles.catTitle}>
                            {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
			);
	}
}

const styles = StyleSheet.create({
    screenTitle: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'SignPainter',
      textAlign: 'center',
      marginTop: 10
    },
    subheader: {
      color: 'black',
      fontSize: 12,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      margin: 10,
      marginBottom: 0
    },
    sectionTitle: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Century Gothic',
      color: 'black',
      margin: 10,
      marginTop: 30,
      marginBottom: 0,
    },
    cardStyle: {
      height: 135,
      width: 135,
      margin: 10,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 12,
      alignItems: 'center',
      shadowOffset:{height: 1.5},
      shadowColor: 'grey',
      shadowOpacity: 1.0,
      shadowRadius: 2,
    },
    catTitle: {
      textAlign: 'center',
      color:'white',
      fontFamily: 'Century Gothic',
      fontSize: 18,
      opacity: 1,
      padding: 5,
      paddingBottom: 10,
      position: 'absolute'
    },
    catImage: {
      width:185,
      height:185,
      opacity: 0.6,
      margin: 1,
    },
    catInnerCirc: {
      width:70,
      height:70,
      opacity:0,
      position:'absolute',
      backgroundColor:'white'
    },
    activityTitle: {
      textAlign: 'center',
      color:'black',
      fontFamily: 'Century Gothic',
      fontSize: 15,
      opacity: 1,
      marginTop: -28.5,
      padding: 5,
      backgroundColor:'rgba(255,255,255,0.8)',
    },
    thumbnail: {
      width: 135,
      height: 135,
      justifyContent:'flex-start',
      alignItems:'stretch',
      marginTop:-16,
      opacity:1
    },
    instructions: {
      fontSize: 8.5,
      textAlign: 'left',
      color: '#333333',
      fontFamily: 'Century Gothic',
    },
  });  

  module.exports = CategoryCard;