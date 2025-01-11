
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
			updateContact: async (id, contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact),
					});
					if (response.ok) {
						getActions().fetchContacts();
					}
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			},
			deleteContact: async () => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${currentName}/contacts/${contact.id}`, {
						method: "DELETE",
					});
					if (response.ok) {
						getActions().fetchContacts();
					}
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},
		},
	};
};

export default getState;

