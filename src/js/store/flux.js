const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            error: "",
            contact: null
        },
        actions: {
            userExists: () => {
				fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
				.then((resp) => resp.json())
				.then((data) => {
				  const foundUser = data.agendas.find((item) => item.slug === "MatiRosas31");
		  
				  if (foundUser) {
					  console.log("Usuario encontrado: ", foundUser);
					  getActions().getContacts() 
				  } else {
					  console.log("Usuario no encontrado: Creando usuario...");
					  let newUser = {
						  slug: "MatiRosas31"
					  };
					  fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31", {
						  method: "POST",
						  body: JSON.stringify(newUser),
						  headers: {
							  "Content-Type": "application/json",
						  },
					  })
					  .then((resp) => {
						  console.log(resp.ok); 
						  console.log(resp.status); 
						  return resp.json();  
					  })
					  .then((user) => {
						  console.log("Usuario creado: ", user);
						  getActions().getContacts(); 
					  })
					  .catch((error) => console.error(error));
				  }
				})
				.catch((error) => console.log(error));
            },
            getContacts:  () => {
				fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts")
				.then((resp) => resp.json())
				.then((data) => {
					console.log("Aqui esta el array con los contactos: ", data.contacts);
					setStore({ contacts: data.contacts });
                    return getStore().contacts;
				})
				.catch((error)=> console.log(error));  
            },
            createContact:  (name, email, phone, address) => {
                if (name === "" || email === "" || phone === "" || address === "") {
                    setStore({contacts: "All fields are required!"});
                    return;
                  }
              
                  setStore({ contacts: ""});
              
                  let newContactobj = {
                    name: name,
                    phone: phone,
                    email: email,
                    address: address
                  };
              
                  fetch("https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts", {
                    method: "POST",
                    body: JSON.stringify(newContactobj),
                    headers: {
                      "Content-Type": "application/json",
                    }
                  })
                  .then((resp) => {
                    console.log(resp.ok); 
                    console.log(resp.status); 
                    return resp.json();  
                  })
                  .then((contact) => {
                    console.log("Nuevo contacto creado: ", contact);
                  })
                  .catch((error) => console.log(error))                
            },
            deleteContact: (contactid) => {
                console.log("Este es el contact.id que llega a la function: ", contactid)
                let newupdatedcontacts = getStore().contacts.filter((contact)=> contact.id !== contactid)
                setStore({contacts: newupdatedcontacts})
                fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts/${contactid}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((resp) => {
                    console.log("Esta es la respuesta luego de la peticion de eliminar el contacto: ", resp.status)
                })
                .catch((error) => console.error(error));
            },
         
            getContact: (contactID) => {
                fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts`)
                .then(resp => resp.json())
                .then(data => {
                    const foundContact = data.contacts.find(contact => contact.id === parseInt(contactID));
                    if (foundContact) {
                        setStore({contact: foundContact});
                    }
                })
                .catch(error => console.log(error));
            },
            updateContact: (updatedContact) => {
              fetch(`https://playground.4geeks.com/contact/agendas/MatiRosas31/contacts/${updatedContact.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedContact)
            })
            .then(resp => {
                if (resp.ok) {
                    console.log("Contacto actualizado");
                    // Actualizar el contacto en el store
                    const updatedContacts = getStore().contacts.map(contact => 
                        contact.id === updatedContact.id ? updatedContact : contact
                    );
                    setStore({ contacts: updatedContacts, contact: updatedContact });
                } else {
                    console.log("Error al actualizar el contacto");
                }
                return resp.json();
            })
            .catch(error => console.log("Error en la solicitud de actualización:", error));
            }
           
        }
    };
};

export default getState;