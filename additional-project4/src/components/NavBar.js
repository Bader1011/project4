import React from "react";
const NavBar = ({ user, changeForm, logout, getProducts, activeShow }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="NavBar">
          <ul className="navbar-nav">
            {// if the user is not authenticated
              !user && (
                <React.Fragment>
                  <li onClick={() => { getProducts(); activeShow("users") }}>
                    <div >users</div>
                  </li>
                  <li className="nav-item active" onClick={() => { getProducts(); activeShow("lessons") }}>
                  <div>lessons</div>
                </li>
                  <li onClick={() => { changeForm("volunteer"); activeShow("volunteer") }}>
                    <div>volunteer</div>
                  </li>

                  <li onClick={() => { getProducts(); activeShow("organization") }}>
                    <div >organization</div>
                  </li>

                  <li onClick={() => { changeForm("signup"); activeShow("signup") }}
                  >
                    <div>Signup</div>
                  </li>
                  <li
                    className="nav-item active"
                    onClick={() => { changeForm("login"); activeShow("login") }}
                  >
                    <div>Login</div>
                  </li>
                </React.Fragment>
              )}
            {user && (
              <React.Fragment>
                <li className="nav-item active" onClick={() => { getProducts(); activeShow("lessons") }}>
                  <div>lessons</div>
                </li>
                <li onClick={() => { getProducts(); activeShow("users") }}>
                    <div >users</div>
                  </li>
                <li className="nav-item active" onClick={() => { getProducts(); activeShow("volunteer") }}>
                  <div>volunteer</div>
                </li>
                <li className="nav-item active" onClick={() => { getProducts(); activeShow("organization") }}>
                  <div>organization</div>
                </li>
                <li className="nav-item active" onClick={() => { logout(); activeShow("logout") }}>
                  <div>Logout</div>
                </li>
              </React.Fragment>
            )

            }
          </ul>
        </div>
      </nav>
      <div>


      </div>
    </div>
  );
};

export default NavBar;
