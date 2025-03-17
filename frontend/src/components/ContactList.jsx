import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchContacts, deleteContact } from "../redux/contactSlice";
import Weather from "./Weather";
import "./ContactList.css";

function ContactList() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="contact-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search contacts by name, phone, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="contacts-grid">
        {filteredContacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <h3>{contact.name}</h3>
            <p>📱 {contact.phone}</p>
            <p>📍 {contact.address}</p>
            <Weather address={contact.address} />
            <div className="contact-actions">
              <Link to={`/edit/${contact._id}`} className="edit-button">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(contact._id)}
                className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="no-contacts">
          {searchTerm ? (
            "No contacts found matching your search."
          ) : (
            <>
              No contacts available. <Link to="/add">Add one now!</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactList;
