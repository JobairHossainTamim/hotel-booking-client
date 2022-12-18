import React, { useState } from 'react';
import './Room.css';
import RoomDetails from './../RoomDetails/RoomDetails';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


AOS.init(
    { duration: 2000 }
);



const Room = ({ room, fromDate, toDate }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();


    return (
        <div className='row bs' data-aos="fade-up">
            <div className='col-md-4'>
                <img src={room.imageUrls[0]} alt={room.imageUrls[0]} className="small-img" />
            </div>
            <div className='col-md-7 text-left'>
                <h1>{room.name}</h1>
                <b> <p>Max Count : {room.maxCount}</p></b>
                <b><p>Phone Number : {room.phoneNumber}</p></b>
                <b><p>Type : {room.type}</p></b>

                <div style={{ float: "right" }}>
                    {
                        (fromDate && toDate) && (
                            <Link to={`/booking/${room._id}/${fromDate}/${toDate}`}>
                                <button className='btn btn-dark m-2' >Booking</button>
                            </Link>
                        )
                    }

                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>

            {/* Modals */}

            <>

                {show && <RoomDetails show={show} setShow={setShow} room={room} />}

            </>
        </div>
    );
};

export default Room;