import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './../Messages/Loader/Loader';
import Error from './../Messages/Error/Error';
import { Tag, Divider } from 'antd';
import Swal from "sweetalert2";

export default function BookingDetails() {

    const user = JSON.parse(localStorage.getItem('CurrentUser'))
    const [myBooking, setMyBooking] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setsuccess] = useState(false);

    const getDataByUser = async () => {
        try {
            setLoading(true);
            const data = await (
                await axios.post(`${process.env.REACT_APP_API_URL}/booking/getBookingByUserId`, {
                    userId: user._id,
                })
            ).data;

            setMyBooking(data);
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataByUser()
    }, [])



    async function cancelled(bookingId, roomId) {
        try {

            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/booking/cancelBooking`, { bookingId, roomId })
            console.log(result.data);
            setLoading(false);

            Swal.fire('Congrats', 'Your Room has cancelled successfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            
            Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
                window.location.href = '/profile'
            })
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <Loader />}
            {error && <Error />}
            {
                myBooking && (myBooking.map(booking => {
                    return <div className='row' key={booking._id}>
                        <div className="col-md-6 my-auto">
                            <div className='bs m-1 p-2'>
                                <h1>{booking.room}</h1>
                                <p>Booking Id : {booking._id}</p>
                                <p>Transaction Id : {booking.transactionId}</p>
                                <p><b>Check In : </b>{booking.fromDate}</p>
                                <p><b>Check Out : </b>{booking.toDate}</p>
                                <p><b>Amount : </b> {booking.totalAmount}</p>
                                <p><b>Status</b> : {booking.status === 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                                <div className='text-right'>
                                    {booking.status === 'booked' && (<button className='btn btn-primary' onClick={() => { cancelled(booking._id, booking.roomId) }} >Cancel Booking</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                }))
            }
        </div>
    )
}
