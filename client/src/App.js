import React, { useEffect, useState } from "react";
import Login from './components/Login';
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogOutClick(){
    fetch("/logout",{
        method: "DELETE"
    }).then((r) => {
        if(r.ok){
            setUser(null);
        }
    });
    // Navigate to home page after logout and clear history
    navigate("/");
}

if (!user)
    return (
      <>
        <Login onLogin={setUser} />
      </>
    );

  return (
    <div className="App">
     <NavBar user={user} handleLogOutClick={handleLogOutClick} />
    </div>
  );
}

export default App;
