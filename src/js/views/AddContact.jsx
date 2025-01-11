import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Context} from "../store/appContext.js";
import Contact from "./Contact.jsx";


const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: ""});



  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resultado= await actions.addContact(contact);
      if (resultado) {
        navigate("/contacts");
      } else {
        alert ("No recibimos el ID al guardar un nuevo contacto")
      }
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h1>{id ? "Edit Contact" : "Add Contact"}</h1> */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={contact.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={contact.address}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddContact;
