import React, { Component } from "react";
import styles from "./ContactForm.module.css";
import PropTypes from "prop-types";
// import shortid from 'shortid';

export default class ContactForm extends Component {
  // newContactId = shortid.generate();
  maxId = 100;

  state = {
    id: "",
    name: "",
    number: ""
  };

  handlerChangeInput = e => {
    // console.log("name", e.target.name);
    // console.log("value", e.target.value);
    this.setState({
      id: this.maxId++,
      [e.target.name]: e.target.value
    });
  };

  handlerSubmitForm = e => {
    this.props.onItemAdded({ ...this.state });
    e.preventDefault();
    this.reset();
  };

  reset = () => {
    this.setState({
      id: "",
      name: "",
      number: ""
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={styles.containerForm}>
        <form className={styles.phoneForm} onSubmit={this.handlerSubmitForm}>
          <label className={styles.phoneHeader}>
            Name
            <input
              className={styles.inputForm}
              onChange={this.handlerChangeInput}
              type="text"
              required
              pattern="^[A-Za-zА-Яа-яЁё\s]+$"
              name="name"
              placeholder="Please, enter Contact's Name and Last Name"
              value={name}
            ></input>
          </label>
          <label className={styles.phoneHeader}> Number </label>
          <input
            className={styles.inputForm}
            onChange={this.handlerChangeInput}
            type="text"
            name="number"
            s
            placeholder="xxx-xxx"
            required
            pattern="[0-9]{3}-[0-9]{3}"
            value={number}
          ></input>
          <button className={styles.buttonForm} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string
};
