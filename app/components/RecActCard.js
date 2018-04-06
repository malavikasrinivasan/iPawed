
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { Card, 
         ListItem, 
         Button 
} from 'react-native-elements';

const acts = [
    {
       name: 'Bath Time',
       avatar: '../img/bath.jpeg',
       blurb: 'Giving your dog a bath is an essential and excellent way to understand your dogs behaviour.'
    },
    {
        name: 'Playtime',
        avatar: '../img/fetch.jpg',
        blurb: 'Toys and play are essential before you even get your pet into the tub.'
    }
   ]

export default  class RecActCard extends Component {
  render()
  {
    return (
      <View>
        <Text style={styles.welcome}>
          Recommended Activities for you
        </Text>
        {/* <Card containerStyle={{padding: 0}} >
        {
            acts.map((a, i) => {
            return (
                <ListItem
                key={i}
                title={a.name}
                avatar={a.avatar}
                subtitle={a.blurb}
                />
            );
            })
        }
        </Card> */}
        <Card
        //   title='WALK YOUR DOG'
          image={require('../img/walking.jpeg')}
        //   containerStyle={{backgroundColor:'#738496'}}
          >
          <Button
            // icon={{name: 'code'}}
            backgroundColor='white'
            // buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Walk Your Dog' 
            onPress={() => this.props.navigation.navigate('ActivityDetail')} />
          <Text style={{marginBottom: 10}}>
            Click to learn more about the different steps involved in taking your dog out on a walk and perfecting it.
          </Text>
          {/* <Button
            // icon={{name: 'code'}}
            backgroundColor='#F7C68F'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='START ACTIVITY' 
            onPress={() => this.props.navigation.navigate('ActivityDetail')} /> */}
        </Card>
        <Card
        //   title='BATH TIME'
          image={require('../img/bath.jpeg')}
        //   containerStyle={{backgroundColor:'#738496'}}
          >
          <Button
            // icon={{name: 'code'}}
            backgroundColor='white'
            // buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Bath Time' />
          <Text style={{marginBottom: 10}}>
            Click to learn more about the different steps involved in bathing your dog and making it fun.
          </Text>
        </Card>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 0,
    color: '#62BEC1'
  },
  instructions: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold'
  },
});

module.exports=RecActCard