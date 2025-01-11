import React, { useContext } from "react";
import {Context} from "../store/appContext.js";


const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);

  const handleDelete = () => {
    actions.deleteContact(contact.id);
  };

  return (
    <div className="contact-card">
      <h3>{contact.full_name}</h3>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.adress}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ContactCard;
