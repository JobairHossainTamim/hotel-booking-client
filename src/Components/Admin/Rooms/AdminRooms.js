import React, { useEffect, useState } from 'react';
import Loader from '../../Messages/Loader/Loader';
import Error from './../../Messages/Error/Error';
import axios from "axios";

const AdminRooms = () => {

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [room, setRoom] = useState([]);



    
    const getData = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/getAllRooms`)

            setLoading(false)
            setRoom(result.data);
        } catch (error) {
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div>
           <h1>Admin Rooms</h1> 
           {loading && (<Loader/>)}
           {error && (<Error/>)}
           {
            room && (
                <table className='table table-bordered table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Room Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent Per day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {room.map(room=>{
                        return <tr key={room._id}>
                            <td>{room._id}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.rentPerDay}</td>
                            <td>{room.maxCount}</td>
                            <td>{room.phoneNumber}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            )
           }
        </div>
    );
};

export default AdminRooms;