
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			currentName: ""
		},
		actions: {
			fetchContacts: async (nameOfAgenda) => {
				try {

					const response0 = await fetch("https://playground.4geeks.com/contact/agendas")
					if (!response0.ok) {
						throw new Error("No sirvió", response0)
					}
					const data0 = await response0.json();
					const userExist = data0.agendas.find(item => item.slug === nameOfAgenda)
					if (!userExist) {
						const newResponse = await fetch(`https://playground.4geeks.com/contact/agendas/${nameOfAgenda}`, {
							method: "POST",
							headers: {
								'Content-Type': 'application/json'
							},
						});
						if (!newResponse.ok) {
							throw new Error("No sirvió")
						}
					}
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${nameOfAgenda}/contacts`)
					if (!response.ok) {
						throw new Error("no sirvió")
					}

					const data = await response.json();

					const store = getStore();
					setStore({ ...store, contacts: data.contacts })
				} catch (error) {
					console.error(error);

				}
			},

			setCurrentName: (actualName) => {
				console.log("entro en el actions set current name y recibio: ", actualName)
				const store= getStore();
				setStore({...store, currentName:actualName});
			},

			addContact: async (contact) => {
				try {
					console.log("este es el contacto a ser enviado: ", contact)
					let store= getStore();
					console.log("este es el nombre que se concatena con el URL: ", store.currentName)
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.currentName}/contacts`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact),
					});
					if (!response.ok) {
						throw new Error("No funciono la carga")
					}
					let data= await response.json();
					console.log("esta es la data de respuesta de creacion de usuario: ", data)
					if (data.id){
						return true;
					} else{
						return false;
					}
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},

			updateContact: async (id, payload) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/dannyp/contacts/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(payload),
					});
					if (!response.ok) {
                        throw new Error("No se pudo editar el contacto");
                    }
                    const store = getStore();
                    const updatedContact = store.contacts.find((contact) => contact.id == id);
                    setStore({ ...store, contacts: [...store.contacts, updatedContact] });
                } catch (error) {
                    console.error(error);
                }
			},
			deleteContact: async (agendaName, id) => {
				let store= getStore()
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`, {
						method: "DELETE",
					});
					if (response.ok) {
						getActions().fetchContacts(agendaName);
					}
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},
		},
	};
};

export default getState;

