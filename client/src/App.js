import React, { useEffect, useState } from "react";
import Login from './components/Login/Login';
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Explore from "./components/Explore/Explore";
import HomePage from "./components/HomePage/HomePage";
import Collection from "./components/Collection/Collection";

function App() {
  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const navigate = useNavigate()

  


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  useEffect(() => {
    // auto-login
    fetch("/artist_me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setArtist(user));
      }
    });
  }, []);

  function handleLogOutClick(){
    if(user){
    fetch("/logout",{
        method: "DELETE"
    }).then((r) => {
        if(r.ok){
            setUser(null);
        }
    });
    // Navigate to home page after logout and clear history
    navigate("/login");
  } else {
    fetch("/artist_logout",{
      method: "DELETE"
  }).then((r) => {
      if(r.ok){
          setArtist(null);
      }
  });
  // Navigate to home page after logout and clear history
  navigate("/login");
  }
}
  return (
    
    <div className="App">
      
     <NavBar user={user} artist={artist} handleLogOutClick={handleLogOutClick} />
     <Routes>
      <Route path="/login" element={<Login onLogin={setUser} setArtist={setArtist}/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/collection" element={<Collection/>}/>
      <Route path="/" element={<HomePage/>}/>
     </Routes>
    </div>
  );
}

export default App;
