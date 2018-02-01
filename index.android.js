import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import store from './src/redux/store'

class myApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggin: true
    };

    this.onLoggin = this.onLoggin.bind(this);
  }

  onLoggin (){
    this.setState({
      isLoggin: true,
    });
  }

  render() {
    // if (this.state.isLoggin) {
    //   return (
    //     <Provider store={store}>
    //       <App />
    //     </Provider>
    //   );
    // }
    // else {
    //   alert(this.state.isLoggin.toString());
    //   return <LoginScreen screenLogin={{ isLogged: this.onLoggin }} />
    // }

    return (
          <Provider store={store}>
            <App />
          </Provider>
        );
  }
}

AppRegistry.registerComponent('PaomartApp', () => myApp);