import React from "react";
import styles from "./ContactList.module.css";
import ContactListItem from "../contactListItem/ContactListItem";
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onItemDeleted }) => (
  <ul className={styles.contactList}>
    {contacts.map(contact => (
      <ContactListItem
        contact={contact}
        key={contact.id}
        onDeleted={() => onItemDeleted(contact.id)}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
  onItemDeleted: PropTypes.func
};

export default ContactList;
