import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import styles from "./App.module.css";
import ContactList from "./contactsList/ContactList";
import Filter from "./filter/Filter";

const filterContacts = (contacts, filterValue) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const toBeAddedContact = (contacts, name, number) => {
  return contacts.find(
    contact => contact.name.includes(name) && contact.number.includes(number)
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: ""
  };

  componentDidMount() {
    // console.log("prevState: ", prevState);
    // console.log("this.state: ", this.state);
    const savedContactsInLocalStorage = localStorage.getItem("contacts");

    if (savedContactsInLocalStorage) {
      this.setState({ contacts: JSON.parse(savedContactsInLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevState: ", prevState);
    console.log("this.state: ", this.state);

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContactData => {
    const contactToAdd = {
      ...newContactData
    };

    if (
      !toBeAddedContact(
        this.state.contacts,
        contactToAdd.name,
        contactToAdd.number
      )
    ) {
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd]
      }));
    } else {
      alert("NOOOOOOOOOOO!!!!!");
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id)
    }));
  };

  changeFilterContact = e => {
    this.setState({ filter: e.target.value });
    // console.log(e.target.value);
  };

  //обновление элемента!!!!!
  // updateCompleted = (id) => {
  //   this.setState(state => ({
  //     contacts: state.contacts.map(contact => {
  //       return contact.id === id ? {...contact, comleted: !contact.completed} : contact})}))
  // }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div>
        <h1 className={styles.headerPhone}>Phonebook</h1>
        <ContactForm onItemAdded={this.addContact} />

        <h2 className={styles.headerPhone}>Contacts</h2>
        {contacts.length >= 2 && (
          <Filter
            value={filter}
            onChangeFilterContact={this.changeFilterContact}
            allContacts={contacts}
          />
        )}
        <ContactList
          contacts={filteredContacts}
          onItemDeleted={this.deleteContact}
        />
      </div>
    );
  }
}
