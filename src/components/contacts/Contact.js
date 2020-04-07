import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
//import "./contact.css";

import { Consumer as Consumer1 } from "../../context";

class Contact extends Component {
  // static propTyes = {
  //   name: PropTypes.string.required,
  //   email: PropTypes.string.required,
  //   phone: PropTypes.string.required
  // };
  state = {
    showContactInfo: false
  };

  // onShowClick = () => {
  //   this.setState({ showContactInfo: !this.state.showContactInfo });
  // };

  onDeleteClick = async (id, dispatch) => {
    //dispatch({ type: "DELETE_CONTACT", payload: id });
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer1>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className={showContactInfo ? "fas fa-minus" : "fas fa-plus"}
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer1>
    );
  }
}

Contact.propTyes = {
  contact: PropTypes.object.required
};

export default Contact;
