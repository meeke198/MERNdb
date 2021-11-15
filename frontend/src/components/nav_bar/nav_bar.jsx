import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearchDollar } from "react-icons/fa";
import { BsCart4} from "react-icons/bs";
// import { CgProfile } from "react-icons/cg";
import Profile from "../header/profile";


export default ({ currentUser, logout }) => {
const display = currentUser ? (
    <div>
      <h3>Welcome {currentUser.username}!</h3>
      <button onClick={logout}>Logout</button>
      <Profile/>
    </div>
  ) : (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Log In</Link>
      <BsCart4 style={{marginLeft: 20, width: 35, height: 35}}/>
    </div>
  );
  return (
    <header className="nav-bar">
      <h1 className="logo">HOMI</h1>
      <div style={{display: 'flex', alignItems: 'center', height: 48, width: 300, background: 'white', padding: 10, borderRadius: 15, border: 'solid black 1px'}}>
        <input type="text" placeholder="Search for anything" style={{flex: 1, height: '100%', border: 'none', outline: 'none', fontSize: 16}}/>
        <FaSearchDollar />
      </div>

      <div>{display}</div>
    </header>
  );
}
