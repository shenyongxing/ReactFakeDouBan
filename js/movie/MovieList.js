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

export default class MovieList extends Component {
    
  static navigationOptions = {
    tabBarLabel: "电影",
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      keywords: "功夫熊猫",
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
              <Search placeholder="请输入电影的名称" onChangeText={this.changeText} defaultValue={this.state.keywords}/>
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
    var casts = row.casts;
    var names = [];   // 演员表
    for(var i in casts){
      names.push(casts[i].name);
    }
    
    return (
      <View style={[styles.row,styles.item]}>
        <View>
          <Image style={styles.img} source={{uri: row.images.medium}}/>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.textWitdh} numberOfLines={1}>
            名称：{row.title}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            演员：{names}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            评分：{row.rating.average}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            时间：{row.year}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            标签：{row.genres}
          </Text>
          <TouchableOpacity style={styles.goDou} onPress={this.goDouban.bind(this, row.title, row.alt)}>
            <Text>详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  getData = () => {
    var baseUrl = Service.movie_search + "?count=10&q=" + this.state.keywords; 
    // 开启loading
    this.setState({
      show: false,
    })

    Util.get(baseUrl, data => {
      if (!data.subjects || !data.subjects.length) {
        return Alert.alert("电影服务出错");
      }

      var subjects = data.subjects;
      this.setState({
        data: subjects,
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
    width:80,
    height:110,
    resizeMode: Image.resizeMode.contain
  },
  textWitdh:{
    flex:1,
    marginLeft:10
  },
  item:{
    marginTop:10,
    height:140,
    paddingTop:15,
    paddingBottom:5,
    paddingLeft:10,
    borderBottomWidth:Util.pixel,
    borderTopWidth:Util.pixel,
    borderColor:"#ddd"
  },
  goDou:{
    justifyContent:'center',
    alignItems:'center',
    height:32,
    width:60,
    borderWidth:Util.pixel,
    borderColor:'#3C9BFD',
    marginLeft:10,
    marginTop:0,
    borderRadius:3
  }
});
