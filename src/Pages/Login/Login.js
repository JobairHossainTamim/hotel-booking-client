import React, { useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from './../../Components/Messages/Loader/Loader';
import Error from './../../Components/Messages/Error/Error';
import Success from './../../Components/Messages/Success/Success';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();


    const formik = useFormik({

        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(6, "Enter Password Must be 6 character").max(30, "User name Must be at least 20 characters").required("Password Must be Required"),

        }),
        onSubmit: async (values) => {

            try {
                // 
                setLoading(true);
                // 
                const user = {
                    email: values.email,
                    password: values.password
                }
                const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user)

                const data=result.data;

                // 
                localStorage.setItem('CurrentUser', JSON.stringify(data));
                window.location.href="/home";

                //    
                setLoading(false);
                setSuccess(true);

            } catch (error) {
                setLoading(false);
                setError(true);
            }

        }

    })

    return (
        <div className='container'>
            {loading && <Loader />}

            <div className='row justify-content-center mt-5'>
                <div className='col-md-6'>
                    {error && <Error />}
                    {success && <Success />}

                    <div className='bs'>
                        <h1 className='reg-header'>Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <input type="text" className="form-control" placeholder='Enter Your Email' name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
                            <input type="text" className="form-control" placeholder='Enter Your Password' name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}
                            <button className='btn btn-primary mt-3' type="submit">Login</button>
                        </form>
                        <Link to='/register'>If you don't Have Account Please Register & Enjoy Our Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;