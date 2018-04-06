import React, { Component } from 'react';

import { StyleSheet, View, WebView, Platform } from 'react-native';

export default class VideoEmbed extends Component {
    render() {
        return (

            <View style={{ height: 300 }}>
                <WebView
                        style={ styles.WebViewContainer }
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{uri: 'https://www.youtube.com/embed/4QEbOPzjFCc' }}
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