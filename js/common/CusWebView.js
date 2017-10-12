import React, { Component, PropTypes } from 'react';
import {
	WebView,
  	View,
} from 'react-native';

import Util from './Util'

export default class CusWebView extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
    });

    render() {
        const {state} = this.props.navigation;
        console.log("调试信息");
        console.log(state.params.url);
        console.log(Util.size.width);
        console.log(Util.size.height - Util.navigationHeight - 64);

        return (
            <View style={{flex: 1}}>
            	<WebView
		          startInLoadingState={true}
		          style={{width: Util.size.width, height:Util.size.height - Util.navigationHeight - 64}}
		          source={{uri: state.params.url}}
                  onLoad={() => {console.log("onLoad")}}
                  onLoadStart={() => console.log("onLoadStart")}
                  onLoadEnd={() => console.log("onLoadEnd")}/>
            </View>
        );
    }
}

