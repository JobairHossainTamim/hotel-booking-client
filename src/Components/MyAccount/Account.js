import React, { useState } from 'react';



const Account = () => {

    const user = JSON.parse(localStorage.getItem('CurrentUser'))
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);


    return (
        <div>
         
            <div className="row">
                <div className="col-md-6 bs m-2 p-3">
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>Admin Access : {user.isAdmin ? "Yes" : "No"}</h1>
                    <div className='text-right'>
                        <button className='btn btn-primary'>Get Admin Access</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;