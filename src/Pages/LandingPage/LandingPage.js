import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


AOS.init(
    { duration: 2000 }
);

const LandingPage = () => {
    return (
        <div className='row justify-content-center text-center' >
            <div className='landing '>
                <div className='col-md-9 my-auto' style={{ borderRight: '8px solid white' }}>
                    <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "130px" }}>HotelRoom</h2>
                    <h1 data-aos="zoom-out" style={{ color: "white" }}>Online best Hotel In This City</h1>
                    <Link to='/home'> <button data-aos="zoom-in" className='btn btn-primary'>Get Started</button></Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;