import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Card,
    ListItem,
    Button
  } from 'react-native-elements';

//   const navigation = this.props.navigation;

export default class ActivityCard extends Component {
	render() {
        const item = this.props.item
        console.log(item)
        console.log("Image",this.props.item.imageurl)
		return (
			<TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail', {item})}>
              <Card containerStyle={styles.cardStyle}>
                    <ImageBackground
                        style={styles.thumbnail}
                        source={{uri: item.imageurl}}/>
                    <View style={{justifyContent:'flex-end', flex:0.2}}>
                      <Text style={styles.activityTitle}>
                        {item.title}
                      </Text>
                    </View>
              </Card>
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
      color:'black',
      fontFamily: 'Century Gothic',
      fontSize: 14,
      opacity: 1,
      padding: 5,
      paddingBottom: 10,
      fontStyle:'italic',
      position: 'absolute'
    },
    catInnerCirc: {
      width:70,
      height:70,
      borderRadius: 35,
      position:'absolute',
      backgroundColor:'white'
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

  module.exports = ActivityCard;
