
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
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CollapsibleCard extends Component {
    anime = {
        height: new Animated.Value(),
        expanded: false,
        contentHeight: 0,
    }

    constructor(props) {
        super(props);

        this._initContentHeight = this._initContentHeight.bind(this);
        this.toggle = this.toggle.bind(this);
        this.anime.expanded = props.expanded;
        this.state = {
          icon: 'chevron-right'
        };
    }

    _initContentHeight(evt) {
        if (this.anime.contentHeight>0) return;
        this.anime.contentHeight = evt.nativeEvent.layout.height;
        this.anime.height.setValue(this.anime.expanded ? this._getMaxValue() : this._getMinValue() );
    }

    _getMaxValue() { return this.anime.contentHeight };
    _getMinValue() { return 0 };

    toggle() {
        this.anime.expanded = !this.anime.expanded;
        Animated.timing(this.anime.height, {
            toValue: this.anime.expanded ? this._getMaxValue() : this._getMinValue(),
            duration: 300,
        }).start();
        if (this.anime.expanded) {
          this.setState({icon: 'chevron-down'})
        } else {
          this.setState({icon: 'chevron-right'})
        };
    }

    render() {
        return (
            <View >
              <View style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={this.toggle} style={{flexDirection:'row', justifyContent:'flex-start'}}>
                  <Icon name={this.state.icon} size={18} style={styles.actStepMoreIcon} />
                  <Text style={styles.titleStyle}>{this.props.title}</Text>
                </TouchableOpacity>
              </View>

                <Animated.View style={{ height: this.anime.height }} onLayout={this._initContentHeight}>
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
    margin: 10,
    color: 'black',
    fontFamily: "Century Gothic"
  },
  actStepMoreIcon: {
    color:'#5AC8B0',
    margin: 10,
    marginTop: 13,
    marginRight: 0,
    flex: 0.06
  },
});

module.exports=CollapsibleCard;
