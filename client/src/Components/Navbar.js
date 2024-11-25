import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Contribute from './Contribute';


export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const { note } = props;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    // window.location.reload()
  };
  let homepage=()=>{
    toast("Youre  in home page")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-glass bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Snap Notes</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                  onClick={homepage}
                >
                  Home
                </Link>

              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/contribute" ? "active" : ""}`}
                  aria-current="page"
                  to="/contribute"
                >
Contribute
                </Link>
                
              </li>
            </ul>
            <span className="navbar-text">
              {!localStorage.getItem("token") ? (
                <div>
                  <Link to='/login' className='btn btn-primary m-1' role='button'>Login</Link>
                  <Link to='/signup' className='btn btn-primary m-1' role='button'>Sign Up</Link>
                </div>
              ) : (
                <button onClick={logout} className='btn btn-primary'>Logout</button>
              )}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
