import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { Card,
  ListItem,
  Button
} from 'react-native-elements';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import RecActCard from '../../components/RecActCard';
import HorActCards from '../../components/HorActCards';
import ActCat from '../../components/ActCat';

export default class ActivityMain extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name="paw" size={24} color={tintColor}/>
      ),
    title: 'Activities',
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

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <ImageBackground source={require('../../img/ActivityMain.jpeg')} style={{justifyContent:'flex-end', alignItems:'center', height:200}}>
          <View style={{flexDirection: 'row', backgroundColor:'rgba(255,255,255,0.8)', alignSelf:'stretch', justifyContent: 'center'}}>
            <Text style={styles.welcome}>
              Activities
            </Text>
          </View>
        <View style={{borderColor: 'lightgrey', borderWidth: 0.8, alignSelf:'stretch'}}/>
        </ImageBackground>

        <Text style={styles.sectionTitle}>
          {"Recommended Activities For You:"}
        </Text>

        <View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{flex:0.5}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                  <View style={{flexDirection: 'column'}}>
                    <View style={styles.iconAndTitle}>
                        <Image
                            style={styles.thumbnail}
                            source={require('../../img/bath.jpeg')}/>
                          <Text style={styles.activityTitle}>
                            {"Bath Time"}
                          </Text>
                      </View>
                      <Text style={styles.instructions}>
                          {"Giving your dog a bath is an essential and excellent way to understand your dogs behaviour."}
                      </Text>
                  </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.5}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                  <View style={styles.iconAndTitle}>
                      <Image
                          style={styles.thumbnail}
                          source={require('../../img/fetch.jpeg')} />
                      <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                      <Text style={styles.activityTitle}>
                      Playtime
                      </Text>
                      </View>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                      <Text style={styles.instructions}>
                      {"Toys and play are essential before you even get your pet into the tub. Play with them in the bathroom and bring in their favorite toys. Basically, you're teaching them the bathroom is not a scary place."}
                      </Text>
                  </View>
              </Card>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{flex:0.5}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                <Card containerStyle={styles.cardStyle}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={styles.iconAndTitle}>
                          <Image
                              style={styles.thumbnail}
                              source={require('../../img/bath.jpeg')}/>
                            <Text style={styles.activityTitle}>
                              {"Water Wings"}
                            </Text>
                        </View>
                        <Text style={styles.instructions}>
                          {"We're not saying you need those floaty devices that are so popular in teaching the young to swim."}
                        </Text>
                    </View>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:0.5}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                <Card containerStyle={styles.cardStyle}>
                    <View style={styles.iconAndTitle}>
                        <Image
                            style={styles.thumbnail}
                            source={require('../../img/fetch.jpeg')} />
                        <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.activityTitle}>
                        {"Bubble, Bubble"}
                        </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.instructions}>
                          {"Fortunately, no toil and trouble this time. But we will the best way to make bath time fun is getting your pet high-quality shampoos, conditioners, and spritzers..."}
                        </Text>
                    </View>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
      </View>

        {/* <HorActCards style={{marginBottom:10}}/> */}
      <ActCat/>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 7,
    color:'black',
    fontFamily: 'Century Gothic'
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    color: '#5AC8B0',
    margin: 10,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  cardStyle: {
    height: 150,
    margin: 10,
    marginLeft: 5,
    marginRight: 5
  },
  iconAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  activityTitle: {
    justifyContent:'center',
    alignItems:'center',
    color:'#5AC8B0',
    fontFamily: 'Century Gothic',
    alignItems: 'center',
    margin: 8
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  instructions: {
    fontSize: 8.5,
    textAlign: 'left',
    color: '#333333',
    fontFamily: 'Century Gothic',
  },
});

AppRegistry.registerComponent('ActivityMain', () => ActivityMain);
