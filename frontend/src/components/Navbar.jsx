import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          📞 Contacts App
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/add" className="add-button">
          + Add Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
