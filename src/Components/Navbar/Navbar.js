import React from 'react';
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaBars, FaUserAlt } from 'react-icons/fa';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("CurrentUser"));

    function logout() {
        localStorage.removeItem("CurrentUser");
        window.location.href = "/login";
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" >Chose Room</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><FaBars color='white'></FaBars></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            {
                                user ? (<>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            <FaUserAlt></FaUserAlt> {user.name}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                user.isAdmin === true && (
                                                    <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                                                )
                                            }
                                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                            <Dropdown.Item href="/" onClick={logout}>Logout</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>


                                </>)

                                    :
                                    (<>

                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">Login</a>
                                        </li>

                                    </>)

                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;