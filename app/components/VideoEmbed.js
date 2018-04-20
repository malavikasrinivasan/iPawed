import React, { Component } from 'react';

import { StyleSheet, View, WebView, Platform } from 'react-native';

export default class VideoEmbed extends Component {
    render() {
        const url = this.props.uri
        return (
            <View style={{ height: 200, width: 320}}>
                <WebView
                        style={ styles.WebViewContainer }
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{uri: url }}
                />
            </View>

        );
    }
}

  const styles = StyleSheet.create({

    WebViewContainer: {

        marginTop: (Platform.OS == 'ios') ? 20 : 0,

      }

    });

    module.exports=VideoEmbed
