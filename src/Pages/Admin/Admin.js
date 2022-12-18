import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import AddRooms from '../../Components/Admin/AddRooms/AddRooms';
import AdminRooms from '../../Components/Admin/Rooms/AdminRooms';
import AdminBookings from './../../Components/Admin/Bookings/AdminBookings';
import AdminUser from './../../Components/Admin/Users/AdminUser';

const Admin = () => {

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem('CurrentUser')).isAdmin) {
            window.location.href = "/home";
        }
    }, []);




    return (
        <div>
            <div className='container'>

                <div className="mt-5 ml-3 bs" >
                    <h1>Admin Controller</h1>
                    <Tabs
                        defaultActiveKey="1"

                        items={[
                            {
                                label: `Booking`,
                                key: '1',
                                children: <AdminBookings />,
                            },
                            {
                                label: `Room`,
                                key: '2',
                                children: <AdminRooms />,
                            },
                            {
                                label: `Add Room`,
                                key: '3',
                                children: <AddRooms/>,
                            },
                            {
                                label: `User`,
                                key: '4',
                                children: <AdminUser />,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Admin;