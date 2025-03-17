import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateContact } from "../redux/contactSlice";
import "./AddContact.css"; // Reusing the same styles

function EditContact() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector((state) => state.contacts);

  const contact = contacts.find((c) => c._id === id || c.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    } else {
      navigate("/");
    }
  }, [contact, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Ensure phone contains exactly 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactId = contact._id || contact.id;
    if (validateForm()) {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      dispatch(
        updateContact({
          id: contactId,
          contact: {
            ...formData,
            phone: phoneDigits,
          },
        })
      );
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Only allow digits
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        setFormData({ ...formData, [name]: digits });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone (10 digits)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
