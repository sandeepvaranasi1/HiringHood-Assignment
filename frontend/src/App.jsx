import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import WeatherDashboard from "./components/WeatherDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-layout">
          <aside className="weather-sidebar">
            <WeatherDashboard />
          </aside>
          <main className="contacts-main">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<EditContact />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
