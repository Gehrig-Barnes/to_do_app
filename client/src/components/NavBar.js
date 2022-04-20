import React from 'react'

function NavBar({handleLogOutClick}){
    return (
        <div>
            <button onClick={handleLogOutClick}>Logout</button>
        </div>
    )

}

export default NavBar