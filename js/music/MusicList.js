import Util from './../common/Util';
import Search from './../common/Search';
import React, { Component } from 'react';
import Service from './../common/Service';
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

export default class MusicList extends Component {
    
  static navigationOptions = {
    tabBarLabel: "音乐",
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      keywords: "偏偏喜欢你",
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
              <Search placeholder="请输入歌曲的名称" onChangeText={this.changeText} defaultValue={this.state.keywords}/>
            </View>
            <TouchableOpacity style={styles.btn} onPress={this.search}>
              <Text style={styles.fontFFF}>搜索</Text>
            </TouchableOpacity>
          </View>
          {this.state.show ? <FlatList data={this.state.data} renderItem={({item}) => this.renderRow(item)} keyExtractor={item => item.title}/> : <ActivityIndicator color="#3E00FF" style={{marginTop:40}}/>}
        </View>
      );
  }
  
  // 渲染列表行
  renderRow = (row) => {
    var authors = row.author;
    var names = [];
    for(var i in authors){
      names.push(authors[i].name);
    }
    return (
      <View style={styles.item}>
        <View style={styles.center}>
          <Image style={styles.img} source={{uri: row.image}}/>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.flex_1,{marginLeft:20}]} numberOfLines={1}>曲目：{row.title}</Text>
          <Text style={[styles.textWidth]} numberOfLines={1}>演唱：{names}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.flex_1, {marginLeft:20}]} numberOfLines={1}>时间：{row.attrs['pubdate']}</Text>
          <Text style={styles.textWidth} numberOfLines={1}>评分：{row['rating']['average']}</Text>
        </View>
        <View style={[styles.center]}>
          <TouchableOpacity style={[styles.goDou, styles.center]} onPress={this.goDouban.bind(this, row.title, row.mobile_link)}>
            <Text>详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  getData = () => {
    var baseUrl = Service.music_search + "?count=10&q=" + this.state.keywords; 
    // 开启loading
    this.setState({
      show: false,
    })

    Util.get(baseUrl, data => {
      if (!data.musics || !data.musics.length) {
        return Alert.alert("音乐服务出错");
      }

      var musics = data.musics;
      this.setState({
        data: musics,
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

  /** 
   * 跳转到webview展示具体内容
   */
  goDouban = (title, url) => {
      this.props.navigation.navigate("CusWebView", {title: title, url: url});
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
  },
  img:{
    width:70,
    height:70,
    borderRadius:35
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  item:{
    marginTop:10,
    borderTopWidth:Util.pixel,
    borderBottomWidth:Util.pixel,
    borderColor:'#ddd',
    paddingTop:10,
    paddingBottom:10
  },
  textWidth:{
    width:120
  },
  goDou:{
    height:35,
    width:60,
    borderWidth:Util.pixel,
    borderColor:'#3082FF',
    borderRadius:3
  }
});
