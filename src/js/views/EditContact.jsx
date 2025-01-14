import React, { useState, useRef, useEffect, useContext } from "react";

const EditContact = () => {
    const { store, actions } = useContext(Context);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const { id } = useParams();





    const saveContact = () => {
        const payload = {
            name: nombre,
            phone: telefono,
            email: email,
            address: direccion
        };
        if (!id) {
            actions.updateContact(id, payload);
        }

    };

    return (
        <div className="container d-flex flex-column justify-content-start align-items-center mb-5" style={{
            height: '700px', width: '80%'
        }}>
            <h1 className="text-center">{!id ? "Add a New Contact" : `Editing Contact: ${nombre}`}</h1>
            <label>
                <p>Nombre:</p>
                <input type="text" id="input1" placeholder="Nombre" value={nombre} className="bg-light form-control" style={{ width: '500px' }} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <br />
            <label>
                <p>Email:</p>
                <input type="email" id="input2" placeholder="Email" value={email} className="bg-light form-control" style={{ width: '500px' }} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
                <p>Teléfono:</p>
                <input type="number" id="input3" placeholder="Teléfono" value={telefono} className="bg-light form-control" style={{ width: '500px' }} onChange={(e) => setTelefono(e.target.value)} required />
            </label>
            <br />
            <label>
                <p>Dirección:</p>
                <input type="text" id="input4" placeholder="Dirección" value={direccion} className="bg-light form-control" style={{ width: '500px' }} onChange={(e) => setDireccion(e.target.value)} required />
            </label>
            <br />
            <Link to="/contacts"> <button className="btn btn-lg btn-primary" type="submit" onClick={saveContact} style={{ width: '500px' }} >Enviar</button></Link>
            <br />
            <Link to="/contacts"><a>Volver a tus contactos</a></Link>
        </div >
    )
}

export default EditContact; 