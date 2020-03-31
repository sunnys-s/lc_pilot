import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    addContact,
    registerNewContact
} from '../actions/AppActions';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api_url } from './../resources/constants';
import { Rating, AirbnbRating } from 'react-native-elements';

class AddReatQuestion extends Component {
    constructor() {
        super();
        this.state = {
            statement: "",
            type: "rate",
            weight: "1",
            value: "default",
        }
    }
    handleSave = () => {
        AsyncStorage.getItem("authorization")
            .then((token) => {
                let url = api_url + "/api/v1/questions";
                let data = { question: { ...this.state, template_id: this.props.id } };
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                axios.post(url, data, {
                    headers: headers
                }).then(response => {
                    let question = response.data.data;
                    console.log(question);
                    Actions.editSurvey({ title: this.props.title, id: this.props.id })
                }).catch((error) => {
                    console.log(error);
                    return null;
                })
            })
            .catch((err) => {
                console.log("Token Error: ", err);
                return null;
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    multiline
                    style={{
                        borderColor: '#CBCAC9',
                        borderWidth: 1,
                        height: 50
                    }}
                    placeholder="Question Text"
                    onChangeText={(value) => this.setState({ statement: value })}
                />
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
                    defaultRating={5}
                    size={20}
                />
                <Button
                    style={styles.saveBtn}
                    title="Save"
                    color="#115E54"
                    onPress={() => this.handleSave()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    saveBtn: {
        position: 'absolute',
        bottom: 20
    }
})

const mapStateToProps = state => (
    {
        email_contact: state.AppReducer.email_contact,
    }
);
export default connect(
    mapStateToProps, {
    addContact,
    registerNewContact
})(AddReatQuestion);