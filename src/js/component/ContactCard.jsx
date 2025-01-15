import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom'



const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const [agendaName, setAgendaName] = useState("dannyp")


  const handleDelete = async () => {
    actions.deleteContact(agendaName, contact.id);
    await actions.fetchContacts(agendaName);

  };

  const handleEdit = async () => {
    actions.updateContact(contact.id, contact);
    await actions.fetchContacts(agendaName);

  };


  return (
    <div className="card mb-3" key={contact.id} style={{
      width: '540px'
    }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src="https://picsum.photos/170/170/" className="img-fluid rounded-circle p-3" alt="Aquí debería haber una foto :)" />
        </div>
        <div className="col-md-8">
          <div className="card-body"></div>
          <h3>{contact.name}</h3>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>Address: {contact.address}</p>
          <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
          <Link to={`/edit-contact/${contact.id}`}>
            <button>Edit</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ContactCard;
