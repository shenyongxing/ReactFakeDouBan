import Util from './Util' ;
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import React, { Component } from 'react';

export default class Search extends Component {

    render() {
        return (
            <View style={styles.flex_1}>
        		<TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
      		</View>
        );
    }
}

var styles = StyleSheet.create({
  flex_1:{
    flex:1
  },
  input:{
    borderWidth: Util.pixel,
    height:40,
    borderColor:'#DDDDDD',
    paddingLeft:5
  }
});
