import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import MainScreen from './components/MainScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AddContactScreen from './components/AddContactScreen';
import AddTemplateScreen from './components/AddTemplateScreen';
import AddTextQuestion from './components/AddTextQuestion';
import AddMcqQuestion from './components/AddMcqQuestion';
import Chat from './components/Chat';
import SelectContact from './components/SelectContact';
import SurveyShowScreen from './components/SurveyShowScreen';
import SurveyEditScreen from './components/SurveyEditScreen';
import UserTemplateScene from './components/UserTemplateScene'
import Mess from './services/Mess';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: true,
    };
  }

componentWillMount() {
  AsyncStorage.getItem('@mytoken:key')
    .then((token) => {
      if (token != null) {
        this.setState({ logged: true, loading: false, });
      } else {
        this.setState({ loading: false })
      }
    });
  }

  renderAcessRoutes() {
    return (
      <ActivityIndicator size="large" color="#00ff00" />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
        { this.renderAcessRoutes() }
        </View>
      );
    }
    return (
      <Router navigationBarStyle={{ backgroundColor: '#75daad' }} titleStyle={{ color: 'white' }}>
        <Scene key='app'>
          <Scene key='loginScreen' component={LoginScreen} title="Login" hideNavBar={true} initial={!this.state.logged} />
          <Scene key='signUpScreen' component={SignUpScreen} title="SignUp" />
          <Scene key='mainScreen' component={MainScreen} title="MainScreen" hideNavBar={true} initial={this.state.logged} />
          <Scene key='welcomeScreen' component={WelcomeScreen} title="WelcomeScreen" />
          <Scene key='addContactScreen' component={AddContactScreen} title="Add Contact" />
          <Scene key='userTemplateScene' component={UserTemplateScene} title="User Templates" />
          <Scene key='chat' component={Chat} title="Chat" hideNavBar={false} />
          <Scene key='selectContact' component={SelectContact} title="Select contact" hideNavBar={false} />
          <Scene key='addTemplate' component={AddTemplateScreen} title="Add Template" />
          <Scene key='addTextQuestion' component={AddTextQuestion} title="Add Text Question" />
          <Scene key='addMcqQuestion' component={AddMcqQuestion} title="Add Multiple-choice Question" />
          <Scene key='showSurvey' component={SurveyShowScreen} title="Survey Show" />
          <Scene key='editSurvey' component={SurveyEditScreen} title="Survey Edit" />
          <Scene key='b_chat' component={Mess} title="b_Chat" hideNavBar={false} onRight={ ()=> console.log(111) } rightButtonImage={null} />

        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  }
})
