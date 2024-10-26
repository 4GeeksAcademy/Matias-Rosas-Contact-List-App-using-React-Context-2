import React,{useContext,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { middleware } from "modules";

export const ContactCard = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [newcontact, setNewcontact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        id: null
    });

    useEffect(() => {
        actions.getContact(41);
    }, [id]);//Para que siempre este actualizado

    return (
        <div className="container">
        {store.contact ? (
            <>
                <h3>Editing {store.contact.name}</h3>
                <form className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={store.contact.name}
                            onChange={(e) => setNewcontact({...newcontact, name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={store.contact.email}
                            onChange={(e) => setNewcontact({...newcontact, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={store.contact.phone}
                            onChange={(e) => {setNewcontact({...newcontact, phone: e.target.value})}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={store.contact.address}
                            onChange={(e) => {setNewcontact({...newcontact, address: e.target.value})}}
                        />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={()=>{}}
                    >
                      Save
                    </button>
                </form>
            </>
        ) : (
            <div>Loading contact details...</div>
        )}
        <div className="text-center mt-3">
            <a className="text-muted" onClick={() => navigate("/")}>Back to contacts</a>
        </div>
    </div>
    );
};
