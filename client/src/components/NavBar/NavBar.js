import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar({ handleLogOutClick, user }) {
  const showLogOutButton = user ? (
    <button onClick={handleLogOutClick}>Logout</button>
  ) : (
    <NavLink to="/login">LOGIN</NavLink>
  );
  return (
    <div>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/explore">EXPLORE</NavLink>
      <NavLink to="/collection">My Collection</NavLink>
      {showLogOutButton}
    </div>
  );
}

export default NavBar;
