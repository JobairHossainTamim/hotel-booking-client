import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingScreen.css';
import Loader from '../../Components/Messages/Loader/Loader';
import Error from '../../Components/Messages/Error/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


AOS.init(
    { duration: 2000 }
);

const BookingScreen = () => {
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const params = useParams();
    const roomId = params.roomId;
    // calculations day
    const fromDate = params.fromDate;
    const toDate = params.toDate;

    const startDate = moment(fromDate, "DD-MM-YYYY");
    const endDate = moment(toDate, "DD-MM-YYYY");
    const TotalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;
    //    
    const [totalAmount, setTotalAmount] = useState(0);



    const user=JSON.parse(localStorage.getItem("CurrentUser"));

    const getData = async () => {

        try {
            if (!localStorage.getItem('CurrentUser')) {
                window.location.href = "/login";
            }
            else{

                setLoading(true);
                const data = (await axios.post(`${process.env.REACT_APP_API_URL}/rooms/getRoomById`, { roomId: roomId })).data
                setRoom(data);
                setTotalAmount(data.rentPerDay * TotalDays);
                setLoading(false);
            }



        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
      
    }, []);


    // Payment methods
    async function onToken(token) {
        const bookingDetails = {
            room,
            userId: JSON.parse(localStorage.getItem('CurrentUser'))._id,
            fromDate: params.fromDate,
            toDate: params.toDate,
            totalAmount,
            totalDays: TotalDays,
            token

        }
        try {
            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/booking/bookRoom`, bookingDetails)
            setLoading(false);
            Swal.fire("Congratulations ", "Your Room Booked Successfully", 'success').then(result => {

                window.location.href = '/profile'
            })

        } catch (error) {
            setLoading(false);
            Swal.fire("OOpps!!! ", "Your Room Booked failed", 'error')
        }
    }


    // Arranging image 
    const roomImage = room.imageUrls || [];

    return (
        <div className='m-5' data-aos="flip-left">

            {
                loading ? (<Loader />) : room ? (
                    <div className='row justify-content-center bs'>
                        <div className='col-md-6'>
                            <h1>{room.name}</h1>
                            <img src={roomImage[0]} alt={roomImage[0]} className="big-img" />
                        </div>
                        <div className='col-md-6'>
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Booking Details</h1>
                                    <hr></hr>
                                    <p>Name : { user ? user.name :"" } </p>
                                    <p>From Date : {fromDate}</p>
                                    <p>To Date : {toDate}</p>
                                    <p>Max Count : {room.maxCount}</p>
                                </b>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total Days : {TotalDays}</p>
                                    <p>Rent Per Day : {room.rentPerDay}</p>
                                    <p>Total Amount : {totalAmount} </p>
                                </b>
                            </div>
                            <div style={{ float: "right" }}>

                                <StripeCheckout
                                    amount={totalAmount * 100}
                                    token={onToken}
                                    currency="BDT"
                                    stripeKey="pk_test_51Jw1j8CSilcYhWQ0gDnh9NCm6QS7bE8l5wjE7z3vBYEGDOg8trCg4kIH50hAm436BT6N6IismyjFq4P9bKJj7Rc500oKnuXDYw"
                                >
                                    <button className='btn btn-primary' >Pay Now</button>
                                </StripeCheckout>
                            </div>

                        </div>
                    </div>
                )

                    : (<Error />)
            }

        </div>
    );
};

export default BookingScreen;