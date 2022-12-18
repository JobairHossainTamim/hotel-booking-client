import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../../Messages/Loader/Loader';
import Error from './../../Messages/Error/Error';
import Swal from "sweetalert2";


const AdminUser = () => {

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useState([]);

    const getUserData = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAllUser`)
            setUser(result.data);

            setLoading(false)

        } catch (error) {
            setError(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    async function deletedUser(id) {
        try {
            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/deleteUser`, { id });
            Swal.fire('Success', 'Your Are Delete This user', 'success').then(result => {
                window.location.reload();
            })
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }



    return (
        <div className='row'>
            <h1>Users</h1>
            {loading && (<Loader />)}
            {error && (<Error />)}

            {
                user && (
                    <div className="col-md-10">
                        <table className='table table-bordered table-dark'>
                            <thead className='bs'>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>isAdmin</th>
                                    <th>Delete User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map(user => {
                                        return <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                            <td><button className='btn btn-success' onClick={() => deletedUser(user._id)}>Delete User</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                )
            }


        </div>
    );
};

export default AdminUser;