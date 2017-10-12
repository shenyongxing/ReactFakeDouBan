/**
 * 仿豆瓣应用首页，带有3个tab
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import BookList from './book/BookList'
import MovieList from './movie/MovieList'
import MusicList from './music/MusicList'


const Index = TabNavigator({
  Book: {
    screen: BookList,
  },
  Movie: {
    screen: MovieList,
  },
  Music: {
    screen: MusicList,
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  navigationOptions: {
    title: "豆瓣"
  },
  tabBarOptions: {
    indicatorStyle: {height: 0}
  }
});

export default Index;

