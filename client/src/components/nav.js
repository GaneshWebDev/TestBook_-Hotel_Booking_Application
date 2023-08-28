import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function Navbar(prop) {
  const [showMenu, setShowMenu] = useState(false); // State to control menu visibility
  const user = JSON.parse(localStorage.getItem('user'));

  function logOut() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand mx-2" href="#">
          {prop.name}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)} // Toggle menu visibility
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/home">
                    Rooms
                  </a>
                </li>
                <div className="container">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="" onClick={logOut}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/home">
                    Rooms
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
