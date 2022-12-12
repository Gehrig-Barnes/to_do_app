import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ handleLogOutClick, user, artist }) {
  const onNavClick = ({ isActive }) => ({
    transition: "background-color 0.3s ease",
    color: isActive ? "#fff" : "#545e6f",
    background: isActive ? "#7600dc" : "#fff",
  })
  
  const showLogOutButton =
    user || artist ? (
      <button className="navLink" onClick={handleLogOutClick}>
        Logout
      </button>
    ) : (
      <NavLink className="navLink" to="/login" style={onNavClick}>
        LOGIN
      </NavLink>
    );

    

  return (
    <div className="navBar">
      {!user && !artist ? (
        <>
          {" "}
          <NavLink
            style={onNavClick}
            className="navLink"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink  style={onNavClick} className="navLink" to="/explore">
            EXPLORE
          </NavLink>
        </>
      ) : (
        <>
          <NavLink  style={onNavClick} className="navLink" to="/">
            HOME
          </NavLink>
          <NavLink  style={onNavClick} className="navLink" to="/explore">
            EXPLORE
          </NavLink>
          <NavLink  style={onNavClick} className="navLink" to="/collection">
            {user ? "My Rentals" : "My Art"}
          </NavLink>
        </>
      )}

      {showLogOutButton}
    </div>
  );
}

export default NavBar;
