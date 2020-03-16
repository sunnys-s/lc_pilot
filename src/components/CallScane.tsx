import React, { Component } from 'react';
import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { fatchQuestions } from '../actions/AppActions';
import { QuestionText } from './QuestionTypeText'
import { QuestionMcq } from './QuestionTypeMcq'
import { CheckBox, Card } from 'react-native-elements'

const qlist =
{
  "template": "Temp 1",
  "Questions": [
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 2,
      "statement": "is This status Q3",
      "type": "mcq",
      "w": "1",
      "options": [
        {
          "lable": "this is statment 1",
          "test": "1",
          "value": "12"
        },
        {
          "lable": "this is statment 2",
          "test": "2",
          "value": "122"
        },
        {
          "lable": "this is statment 3",
          "test": "3",
          "value": "1245"
        }
      ],
      "value": "value test"
    },
    {
      "id": 3,
      "statement": "is This status",
      "type": "mcq",
      "w": "1",
      "options": [
        {
          "lable": "A",
          "test": "1",
          "value": "12"
        },
        {
          "lable": "B",
          "test": "2",
          "value": "122"
        },
        {
          "lable": "D",
          "test": "3",
          "value": "1245"
        }
      ],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
    {
      "id": 1,
      "statement": "is This status Q1",
      "type": "text",
      "w": "1",
      "options": [],
      "value": "value test"
    },
  ]
}


class CallScane extends Component {
  constructor(props) {
    super()
<<<<<<< Updated upstream
    this.state = { questionsList: qlist }
  }
  renderQuestion(questionContent) {
    let question = questionContent.item
    let q_number = (questionContent.index) + 1;
    if (question.type == "text") {
      return (
        <View style={styles.contener}>
          <Text style={styles.Header}>{q_number}. {question.statement}</Text>
          <QuestionText question={question} number={q_number}></QuestionText>
        </View>
      )
    }
    if (question.type == "mcq") {
      return (
        <View style={styles.contener}>
          <Text style={styles.Header}>{q_number}. {question.statement}</Text>
          <QuestionMcq options={question.options}></QuestionMcq>
        </View>
      )
    }
  }



  render() {
    let renderQiestions = this.state.questionsList.Questions;
    let question = renderQiestions[0]
    return (
      <FlatList
        keyExtractor={(item) => item.id}
        enableEmptySections
        data={renderQiestions}
        renderItem={data => this.renderQuestion(data)}
      />
=======
    this.state = {
      dialogVisible: false,
      templateList: templateList,
      newTemplate: null
    }
  }


  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  handleName = (name) => {
    this.setState({ newTemaplte: name });
    console.log("Calling name create");
    this.setState({ dialogVisible: false })
    Actions.editSurvey({ title: name })
  }

  renderRow(item) {
    const survey = item.item;
    console.log(survey);
    return (
      <TouchableHighlight
        onPress={() => Actions.showSurvey({ title: survey.name })}
      >
        <View style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: "#b7b7b7" }}>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{survey.name}</Text>
            <Text style={{ fontSize: 13 }}>{survey.created_on}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(data) => { data.id }}
          enableEmptySections
          data={this.state.templateList}
          renderItem={(data) => this.renderRow(data)}
        />
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.showDialog()} style={styles.touchableOpacityStyle} >
            <Image source={require('../images/ic_add.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
          <DialogInput isDialogVisible={this.state.dialogVisible}
            title={"Template"}
            message={"Enter name of the template"}
            hintInput={"hint for the input"}
            submitInput={(inputText) => { this.handleName(inputText) }}
            closeDialog={() => this.setState({ dialogVisible: false })}>
          </DialogInput>
        </View>
      </View>
>>>>>>> Stashed changes
    );
  }




}

mapStateToProps = state => {
  const contacts = _.map(state.ListContactsReducer, (value, uid) => {
    return { ...value, uid }
  });

  return {
    email_logged_in: state.AppReducer.email_logged_in,
    contacts: contacts
  }
}
const styles = StyleSheet.create({
  contener: {
    flex: 1,
<<<<<<< Updated upstream
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10
  },
  Header: {
    fontSize: 20,
    fontWeight: 'bold',

=======
    backgroundColor: '#F5F5F5'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
>>>>>>> Stashed changes
  },
  textInput: {
    borderColor: '#777', borderWidth: 1,
    padding: 10,
    flex: 1,
    width: '80%',
    margin: 15,
  }
});
export default CallScane;
