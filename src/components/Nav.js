import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div className="navi">
      <h4 className="head4">Inventory-Man</h4>
      {
        auth ?
          <ul className="nav-ul">
            
            <li className="nav-item">
              <Link to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/add">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item"><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
          : <ul className="nav-ul nav-right">
            <li className="nav-item "><Link to="/signup">Sign Up</Link></li>
            <li className="nav-item"><Link to="/login">Login</Link></li>
          </ul>
      }
    </div>
  );
}

export default Nav;