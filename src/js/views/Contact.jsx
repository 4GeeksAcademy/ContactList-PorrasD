import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "../component/ContactCard.jsx";
import { Context } from "../store/appContext.js";

const Contact = () => {
  const { store, actions } = useContext(Context);
  const [agendaName, setAgendaName] = useState("dannyp")
    const navigate = useNavigate();
  

  const handlerGetContacts = async () => {
    try {
      await actions.fetchContacts(agendaName);
      console.log(store.contacts)

    } catch (error) {
      console.error(error);
    }
  }

  const addContactHandler= () =>{
    console.log("handler agenda name se ve asi: ",agendaName);
    actions.setCurrentName(agendaName);
    navigate("/addcontact");
  }
 
  useEffect(() => {
    handlerGetContacts();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <button onClick={addContactHandler}>Add Contact</button>
      {store.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default Contact;
