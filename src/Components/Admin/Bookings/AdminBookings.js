import React, { useEffect, useState } from 'react';
import Loader from '../../Messages/Loader/Loader';
import Error from './../../Messages/Error/Error';
import axios from 'axios';


const AdminBookings = () => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [booking, setBooking] = useState([]);


    const getData = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/booking/getAllBooking`)

            setLoading(false)
            setBooking(result.data);
        } catch (error) {
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='row '>
            <h1>Bookings</h1>
            {loading && (<Loader />)}
            {error && (<Error />)}

            {
                booking && (
                        <table className='table table-bordered table-dark'>
                            <thead className='bs'>
                                <tr>
                                    <th>Booking Id</th>
                                    <th>User Id</th>
                                    <th>Room</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map(booking => {
                                    return <tr key={booking._id}>
                                        <td>{booking._id}</td>
                                        <td>{booking.userId}</td>
                                        <td>{booking.room}</td>
                                        <td>{booking.fromDate}</td>
                                        <td>{booking.toDate}</td>
                                        <td>{booking.status}</td>
                                    </tr>
                                })}
                            </tbody>


                        </table>
                    
                )
            }
        </div>
    );
};

export default AdminBookings;