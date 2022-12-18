import React, { useState } from 'react';
import { Tabs } from "antd";
import BookingDetails from './../../Components/BookingDetails/BookingDetails';
import Account from './../../Components/MyAccount/Account';


const Profile = () => {
    return (

        <div className='container'>

            <div className="mt-5 ml-3">
                <Tabs
                    defaultActiveKey="1"

                    items={[
                        {
                            label: `My Profile`,
                            key: '1',
                            children: <Account />,
                        },
                        {
                            label: `My Booking`,
                            key: '2',
                            children: <BookingDetails></BookingDetails>,
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Profile;