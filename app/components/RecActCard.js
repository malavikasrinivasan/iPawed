
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { Card, 
         ListItem, 
         Button 
} from 'react-native-elements';
import GridView from 'react-native-gridview';

const acts = [
    {
       name: 'Bath Time',
       avatar: '../img/bath.jpeg',
       blurb: 'Giving your dog a bath is an essential and excellent way to understand your dogs behaviour.'
    },
    {
        name: 'Playtime',
        avatar: '../img/fetch.jpeg',
        blurb: 'Toys and play are essential before you even get your pet into the tub. Play with them in the bathroom and bring in their favorite toys. Basically, you\'re teaching them the bathroom is not a scary place.'
    },
    {
        name: 'Water Wings',
        avatar: '../img/bath.jpeg',
        blurb: 'We\'re not saying you need those floaty devices that are so popular in teaching the young to swim.'
    },
    {
        name: 'Bubble Bubble',
        avatar: '../img/fetch.jpeg',
        blurb: 'Fortunately, no toil and trouble this time. But we will the best way to make bath time fun is getting your pet high-quality shampoos, conditioners, and spritzers...'
    }
   ]

export default  class RecActCard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.renderRow = this.renderRow.bind(this);
    //     this.state = {data: acts};
    // }

    // // renderItem({ item: rowData }) {
    // renderRow(rowData, sectionId, index) {
    //     const cellViews = rowData.map((act, id) => {
    //         return (
    //         //   <TouchableOpacity key={id} styleName="flexible">
    //           <Card key={id}>
    //             <View style={{flex: 1, flexDirection:'row'}}>
    //                 <Image
    //                     style={{ width: 60, height: 60 }}
    //                     source={rowData.avatar} />
    //                 <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
    //                 <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
    //                     {rowData.name}
    //                 </Text>
    //                 </View>
    //             </View>
    //               <View styleName="content">
    //                 <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
    //                 <View styleName="horizontal">
    //                   <Caption styleName="collapsible" numberOfLines={2}>{restaurant.address}</Caption>
    //                 </View>
    //               </View>
    //               <View style={{flexDirection: 'column'}}>
    //                 <Text style={{fontSize: 12}}>
    //                     {rowData.blurb}
    //                 </Text>
    //             </View>
    //           </Card>
    //         //   </TouchableOpacity>
    //         );
    //       });
        
    //       return (
    //         <GridRow columns={2}>
    //           {cellViews}
    //         </GridRow>
    //       );
    // }

  render()
  {
    // const acts = this.state.acts;

    // const groupedData = GridRow.groupByRows(acts, 2, () => {return 1;});

    return (
      <View>
        <Text style={styles.welcome}>
          Recommended Activities for you
        </Text>
        {/* <ListView
            data={groupedData}
            renderRow={this.renderRow}
        /> */}
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
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../img/bath.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Bath Time
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    Giving your dog a bath is an essential and excellent way to understand your dogs behaviour.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../img/fetch.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Playtime
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                Toys and play are essential before you even get your pet into the tub. Play with them in the bathroom and bring in their favorite toys. Basically, you\'re teaching them the bathroom is not a scary place.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../img/bath.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Water Wings
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                We're not saying you need those floaty devices that are so popular in teaching the young to swim.
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
        </Card>
        <Card>
            <View style={{flex: 1, flexDirection:'row'}}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../img/fetch.jpeg')} />
                <View style={{flex: 5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#62BEC1', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={() => this.props.navigation.navigate('ActivityDetail')}>
                Bubble Bubble
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                Fortunately, no toil and trouble this time. But we will the best way to make bath time fun is getting your pet high-quality shampoos, conditioners, and spritzers...
                </Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 12}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </View> */}
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