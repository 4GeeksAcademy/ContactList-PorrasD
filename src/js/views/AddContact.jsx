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
    <form className="container d-flex flex-column justify-content-start align-items-center mb-5" style={{
      height: '700px', width: '80%'
  }} onSubmit={handleSubmit}>
    
      <input className="bg-light form-control" style={{ width: '500px' }}
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
      />
      <input  className="bg-light form-control" style={{ width: '500px' }}
        type="email"
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
      />
      <input className="bg-light form-control" style={{ width: '500px' }}
        type="text"
        name="phone"
        placeholder="Phone"
        value={contact.phone}
        onChange={handleChange}
      />
      <input className="bg-light form-control" style={{ width: '500px' }}
        type="text"
        name="address"
        placeholder="Address"
        value={contact.address}
        onChange={handleChange}
      />
      <button className="btn btn-lg btn-primary"  style={{ width: '500px' }} type="submit">Save</button>
    </form>
  );
};

export default AddContact;
