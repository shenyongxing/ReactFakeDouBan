import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Service from './../common/Service';
import Util from './../common/Util';
import BookItem from './BookItem';

export default class BookDetail extends Component {

	static navigationOptions = {
    	title: '图书详情',
  	};

    constructor(props) {
        super(props);
        // 在构造函数中设置state时需要加上this关键字，否则会报错
        this.state = {
        	data: null, 
        }
    }

	componentDidMount() {
    	this.getDetailData();
  	}

    render() {
        return (
            <View style={[styles.m10]}>
	          
	          <ScrollView style={styles.m10} >
	            {
	              this.state.data ?
	                  <View>
	                    <BookItem row={this.state.data}/>
	                    <View>
	                      <Text style={[styles.title]}>图书简介</Text>
	                      <Text style={styles.text}>{this.state.data.summary}</Text>
	                    </View>

	                    <View>
	                      <Text style={[styles.title]}>作者简介</Text>
	                      <Text style={styles.text}>{this.state.data.author_intro}</Text>
	                    </View>
	                    <View style={{height:50}}></View>
	                  </View>
	                  : <ActivityIndicator color="#3E00FF" style={{marginTop:40}}/>
	            }
	          </ScrollView>
        </View>
        );
    }

    getDetailData = () => {
		var id = this.props.navigation.state.params.id;
		var url = Service.book_search_id + '/' + id;
		Util.get(url, data => {this.setState({data: data})}, err => {Alert.alert("出错啦", err)})
    }
}

var styles = StyleSheet.create({
  m10:{
    flex:1,
  },
  title:{
    fontSize:16,
    marginLeft:10,
    marginTop:10,
    marginBottom:10
  },
  text:{
    marginLeft:10,
    marginRight:10,
    color:'#000D22'
  }
});

