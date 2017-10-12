/**
 * Sample React Native App
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

import { StackNavigator } from 'react-navigation';
import BookList from './js/book/BookList';
import BookDetail from './js/book/BookDetail';
import Index from './js/Index';
import CusWebView from './js/common/CusWebView';

const App = StackNavigator({
  Index: {
    screen: Index,
  },

  BookDetail: {
    screen: BookDetail,
  },

  CusWebView: {
    screen: CusWebView,
  }
});

export default App;

