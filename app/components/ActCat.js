
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
// import { List, ListItem } from 'react-native-elements';

export default  class RecActCard extends Component {
  render()
  {
    return (
      <View>
        <Text style={styles.welcome}>Categories</Text>
        <Card
          title='OUTDOOR'
          image={require('../img/dogpark.jpeg')}
        //   containerStyle={{backgroundColor:'#738496'}}
          >
          <Button
            backgroundColor='white'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW ACTIVITIES' />
          <Text style={{marginBottom: 10}}>
            Click to learn more about the different steps involved in taking your dog out on a walk and perfecting it.
          </Text>
        </Card>
        <Card
          title='HOLIDAY'
          image={require('../img/holiday.jpeg')}
        //   containerStyle={{backgroundColor:'#738496'}}
          >
          <Button
            // icon={{name: 'code'}}
            backgroundColor='white'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW ACTIVITIES' />
          <Text style={{marginBottom: 10}}>
            Click to learn more about the different steps involved in playing fetch your dog and perfecting it.
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