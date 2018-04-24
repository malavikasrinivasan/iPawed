import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        ListView,
        TouchableOpacity,
        Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutScreen extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name="paw" size={24} color={tintColor}/>
      ),
    title: 'About',
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
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.header}>About</Text>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/img_5923.jpg'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Nihar Dalmia</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/img_5684.jpg'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Nisha Pathak</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/me.jpeg'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Karan Rao</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/160820-180101.jpg'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Meghana Murthy</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/_mg_7967_1.jpg'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Malavika Srinivasan</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', alignContent: 'space-between', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Image
              source={{uri: 'https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/photo_0.png'}}
              style={styles.images}
              />
          </View>
          <View style={{justifyContent: 'center', flex:0.5}}>
            <Text style={styles.names}>Rachel Thorp</Text>
          </View>
        </View>

        <Text style={styles.subheader}>
          {"UC Berkeley School of Information\nMIMS Final Project, 2018"}
        </Text>

        <Text style={styles.names}>
          {"Advisor: Steve Weber"}
        </Text>

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
  header: {
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    textAlign: 'center'
  },
  subheader: {
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 16,
    margin: 15,
    textAlign: 'center'
  },
  images: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'center'
  },
  names: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('AboutScreen', () => AboutScreen);
