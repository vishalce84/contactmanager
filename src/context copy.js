import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        name: "Ayaan Khandelwal",
        email: "ayaank@gmail.com",
        phone: "9789878000",
        id: 1
      },
      {
        name: "Aanya Khandelwal",
        email: "anyak@gmail.com",
        phone: "9789878000",
        id: 2
      },
      {
        name: "Apeksha Khandelwal",
        email: "apekshak@gmail.com",
        phone: "9789878000",
        id: 3
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
