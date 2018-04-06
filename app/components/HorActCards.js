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

const data = [
  {
    imageUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fbarkavepet.com%2Fwp-content%2Fuploads%2F2014%2F07%2Fbarkave-play600X400.jpg&imgrefurl=http%3A%2F%2Fbarkavepet.com%2Fdaycare-acivities%2F&docid=8PUPqT4dDubOpM&tbnid=dSSvHuwIdApDOM%3A&vet=10ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwi7ASgjMCM..i&w=600&h=400&bih=803&biw=1440&q=dog%20activities&ved=0ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwi7ASgjMCM&iact=mrc&uact=8",
    title: "Dog Park"
  },
  {
    imageUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.siouxfalls.org%2F-%2Fmedia%2FImages%2Fparks%2Fcropped%2Fdog-events-cropped.ashx%3Fla%3Den%26hash%3D356BB647002A94BCD6C2251CDF8412EEAE0BB103&imgrefurl=http%3A%2F%2Fwww.siouxfalls.org%2Fparks%2Frecreation%2Fdog-events&docid=dIIcw0W5QSVt3M&tbnid=xUxfhNqWFwBWXM%3A&vet=10ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwiSASgEMAQ..i&w=262&h=262&bih=803&biw=1440&q=dog%20activities&ved=0ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwiSASgEMAQ&iact=mrc&uact=8",
    title: "Swimming"
  },
  {
    imageUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-quyuvpa.stackpathdns.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fdog-outdoor-activities-meet.jpg&imgrefurl=https%3A%2F%2Fwww.pawsocute.com%2Fdogs%2Foutdoor-dog-activities%2F&docid=RaJ4alkVfA4Z0M&tbnid=QHT_LE7nJV7V4M%3A&vet=10ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwjIASgwMDA..i&w=800&h=800&bih=803&biw=1440&q=dog%20activities&ved=0ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwjIASgwMDA&iact=mrc&uact=8",
    title: "Socializing"
  },
  {
    imageUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.sitmeanssitforsyth.com%2Fwp-content%2Fuploads%2Fholiday-activities-with-your-dog.jpg&imgrefurl=http%3A%2F%2Fwww.sitmeanssitforsyth.com%2Fdog-holiday-activities%2F&docid=bucsYjCCk4fggM&tbnid=zn3_Y5Qy_cBZ7M%3A&vet=10ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwjxAShZMFk..i&w=1200&h=628&bih=803&biw=1440&q=dog%20activities&ved=0ahUKEwifjcLAzfnZAhUIKWMKHfXvCukQMwjxAShZMFk&iact=mrc&uact=8",
    title: "Holidays"
  },
  {
    imageUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.greatsmokyvacation.com%2Fwp-content%2Fuploads%2F8-Dog-Friendly-Activities-in-and-around-Gatlinburg-1.jpg&imgrefurl=http%3A%2F%2Fwww.greatsmokyvacation.com%2F8-dog-friendly-activities-in-and-around-gatlinburg%2F&docid=Vrrf_oiG5tbmFM&tbnid=i3Uhtv5LalA_2M%3A&vet=12ahUKEwif5dflzfnZAhVR6GMKHaF3DNA4ZBAzKEswS3oECAAQTA..i&w=2000&h=1125&bih=759&biw=1440&q=dog%20activities&ved=2ahUKEwif5dflzfnZAhVR6GMKHaF3DNA4ZBAzKEswS3oECAAQTA&iact=mrc&uact=8",
    title: "Hiking"
  },
  {
    imageUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsplashanddashfordogs.com%2Fwp-content%2Fuploads%2F2017%2F04%2Feaster-coming.jpg&imgrefurl=https%3A%2F%2Fsplashanddashfordogs.com%2Fblog%2Ffive-easter-holiday-activities-dog%2F&docid=T7VoOIFNLJKLUM&tbnid=uP0IEC983NBCQM%3A&vet=12ahUKEwif5dflzfnZAhVR6GMKHaF3DNA4ZBAzKFwwXHoECAAQXQ..i&w=720&h=429&bih=759&biw=1440&q=dog%20activities&ved=2ahUKEwif5dflzfnZAhVR6GMKHaF3DNA4ZBAzKFwwXHoECAAQXQ&iact=mrc&uact=8",
    title: "Dress Your Pet"
  }
];

// const width = Dimensions.get('window').width

export default class HorActCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          Other Activities
        </Text>
        <FlatList
          horizontal
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={null}
                image={{ uri: rowData.imageUrl }}
                containerStyle={{ padding: 0, width: 160}}
              >
                <Text style={{ marginBottom: 10 }}>
                  {rowData.title}
                </Text>
              </Card>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
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

module.exports=HorActCards;