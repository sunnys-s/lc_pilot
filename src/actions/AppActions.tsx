import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';
import axios from 'axios';

import {
  ADD_CONTACT,
  ADD_TEMPLATE,
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_SUCCESS,
  CONTACTS_LIST,
  CHANGE_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  LIST_CONVERSATION_USER,
  FETCH_ALL_CHATS,
} from '../resources/types';

/* added to redux */
export const addContact = (email) => {
  return {
    type: ADD_CONTACT,
    payload: email
  }
}

/* added to redux */
export const addTemplate = (dispatch, template) => {
  dispatch({
    type: ADD_TEMPLATE,
    payload: template
  })
}

export const registerNewContact = (email) => {
  return dispatch => {
    let emailContactB64 = base64.encode(email);

    firebase.database().ref(`/users/${emailContactB64}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) {
        /* Guest email for new contact */
        const userData = _.first(_.values(snapshot.val()));
        /* Currently authenticated user */
        const { currentUser } = firebase.auth();
        let currentEmailB64 = base64.encode(currentUser.email);

        firebase.database().ref(`/users_of_contacts/${currentEmailB64}`)
        .push({ email, name: userData.name })
        .then(() => registerNewContactSuccess(dispatch))
        .catch(error => registerNewContactError(error, dispatch))
      } else {
        dispatch({ type: ADD_NEW_CONTACT_ERROR, payload: '[App] The user does not exist!' })
      }
    })
  }
}

export const createNewTemplate = (template) => {
  return (dispatch) => {
    addTemplate(dispatch, template);
  }
}


export const fetchContacts = (emailLoggedIn) => {
  /* A solução sera ao carregar a aplicação, atualizar o emailLoggedIn  no AppReducer para que aplicação não quebre
  devido ao componentWillMount tentar passar um valor inexistente, fazer um função que que buscar o currentUser e
  da dispatch atualizando na store e deixar o email = ''... assim qunado tiver retorno atualizar os contatos
  */
  return (dispatch) => {
    axios.get("https://life-coach-api.herokuapp.com/api/v1/users_of_contacts")
    .then(response => { 
      let snapshot = response.data;
      dispatch({
        type: CONTACTS_LIST,
        payload: snapshot
      })
    });

    // firebase.database().ref(`/users_of_contacts/${emailLoggedIn}`)
    // .on("value", snapshot => {
    //   dispatch({
    //     type: CONTACTS_LIST,
    //     payload: snapshot.val()
    //   })
    // })
  }
}

export const sendMessage = (message, contactName, contactEmail) => {
  // Current user information
  const { currentUser } = firebase.auth();
  const userEmail = currentUser.email;

  return dispatch => {
    // Convert to base64
    const user_email_encode = base64.encode(userEmail);
    const contact_email_encode = base64.encode(contactEmail);

    // Push to firebase (send and receive)
    firebase.database().ref(`/messages/${user_email_encode}/${contact_email_encode}`)
    .push({ message: message, type: 'send' }).then(() => {
      firebase.database().ref(`/messages/${contact_email_encode}/${user_email_encode}`)
      .push({ message: message, type: 'receive' })
      .then(() => dispatch({ type: SEND_MESSAGE_SUCCESS }))
    }).then(() => {
      // Store header user conversations
      firebase.database().ref(`/user_conversations/${user_email_encode}/${contact_email_encode}`)
      .set({
        name: contactName,
        email: contactEmail,
        lastMessage: message
      })
    }).then(() => {
      // Store header contact conversations
      firebase.database().ref(`/users/${user_email_encode}`).once('value')
      .then(snapshot => {
        const dataUser = _.first(_.values(snapshot.val()))
        firebase.database().ref(`/user_conversations/${contact_email_encode}/${user_email_encode}`)
        .set({
          name: dataUser.name,
          email: userEmail,
          lastMessage: message
        })
      })
    })
  }
}

export const fetchAllChats = currentUserEmail => {
  return dispatch => {
    axios.get("https://life-coach-api.herokuapp.com/api/v1/user_conversations")
    .then(response => { 
      let user_conversations = response.data;
      axios.get("https://life-coach-api.herokuapp.com/api/v1/users_of_contacts")
      .then(response => { 
        let users_of_contacts = response.data;
        const contacts = _.map(users_of_contacts, (value, uid) => {
          return { ...value, uid }
        });

        const conversations = _.map(user_conversations, (value, uid) => {
          return { ...value, uid }
        });

        let array_merged = []
        let count = 0;
        let i=0;
        let y=0;

        for(i=0; i < conversations.length; i++) {
          for(y=0; y < contacts.length; y++) {
            if (conversations[i].email == contacts[y].email) {
              array_merged[count] = { ...conversations[i], ...contacts[y] }
              count++
            }
          }
        }
        console.log(array_merged);

        dispatch({
          type: FETCH_ALL_CHATS,
          payload: array_merged
        });
      })
    })
  }
}
//fatch Questions

export const fetchQuestions=()=>{
  return dispatch=>{
    axios.get("../service/Qdata.json").then((response)=>{
      let questions=response.data
      dispatch({
        payload: questions
      })
    },(error)=>{
      
    })
  }
}



/* Seatch conversation and return it to ListConversation reducer */
export const fetchMessages = contactEmail => {
  const { currentUser } = firebase.auth();
  let user_email_encode = base64.encode(currentUser.email);
  let contact_email_encode = base64.encode(contactEmail);

  return dispatch => {
    firebase.database().ref(`/messages/${user_email_encode}/${contact_email_encode}`)
    .on('value', snapshot => {
      dispatch({
        type: LIST_CONVERSATION_USER,
        payload: snapshot.val()
      })
    })
  }
}

const registerNewContactError = (error, dispatch) => {
  dispatch({
    type: ADD_NEW_CONTACT_ERROR,
    payload: error.message
  })
}

const registerNewContactSuccess = dispatch => (
  dispatch({
    type: ADD_NEW_CONTACT_SUCCESS,
    payload: true
  })
);

export const enableInclusionContact = () => (
  {
    type: ADD_NEW_CONTACT_SUCCESS,
    payload: false
  }
)

/* Chat component message */
export const changeMessage = text => {
  return ({
    type: CHANGE_MESSAGE,
    payload: text
  })
};
