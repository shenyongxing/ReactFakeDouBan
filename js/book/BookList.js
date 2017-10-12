import Util from './../common/Util';
import Search from './../common/Search';
import React, { Component } from 'react';
import Service from './../common/Service';
import BookItem from './BookItem';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default class BookList extends Component {
    
  static navigationOptions = {
    tabBarLabel: "图书",
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      keywords: "c语言",
      data: {},
    }
  }  

  componentDidMount() {
    this.getData();
  }

  render() {
      return (
        <View style={[styles.flex_1,]}>
          <View style={[styles.search, styles.row]}>
            <View style={styles.flex_1}>
              <Search placeholder="请输入图书的名称" onChangeText={this.changeText} defaultValue={this.state.keywords}/>
            </View>
            <TouchableOpacity style={styles.btn} onPress={this.search}>
              <Text style={styles.fontFFF}>搜索</Text>
            </TouchableOpacity>
          </View>
          {this.state.show ? <FlatList data={this.state.data} renderItem={({item}) => this.renderRow(item)} keyExtractor={item => item.isbn13}/> : <ActivityIndicator color="#3E00FF" style={{marginTop:40}}/>}
        </View>
      );
  }
  
  // 渲染列表行
  renderRow = (row) => {
    return (
      <BookItem row={row} onPress={this.showBookDetailsPage.bind(this, row.id)}/>
    );
  }

  getData = () => {
    var baseUrl = Service.book_search + "?count=10&q=" + this.state.keywords; 
    // 开启loading
    this.setState({
      show: false,
    })

    Util.get(baseUrl, data => {
      if (!data.books || !data.books.length) {
        return Alert.alert("图书服务出错");
      }

      var books = data.books;
      this.setState({
        data: books,
        show: true,
      });
    }, err => {
      Alert.alert("出错了");
    });
  }

  search = () => {
    this.getData();
  }

  changeText = (value) => {
    this.setState({
      keywords: value,
    });
  }

  showBookDetailsPage = (id) => {
      this.props.navigation.navigate("BookDetail", {id: id});
  }
}

var styles = StyleSheet.create({
  flex_1:{
    flex:1,
  },
  search:{
    paddingLeft:5,
    paddingRight:5,
    marginBottom:5,
    height:40,
  },
  btn:{
    width:40,
    backgroundColor:'#0091FF',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:Util.pixel,
  },
  fontFFF:{
    color:'#fff'
  },
  row:{
    flexDirection:'row'
  }
});
