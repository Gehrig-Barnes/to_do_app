import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar({ handleLogOutClick, user, artist }) {
  const showLogOutButton =
    user || artist ? (
      <button onClick={handleLogOutClick}>Logout</button>
    ) : (
      <NavLink to="/login">LOGIN</NavLink>
    );

  return (
    <div>
      {!user && !artist ? (
        <>
          {" "}
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/explore">EXPLORE</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/explore">EXPLORE</NavLink>
          <NavLink to="/collection">{user ? "My Rentals" : "My Art"}</NavLink>
        </>
      )}

      {showLogOutButton}
    </div>
  );
}

export default NavBar;
