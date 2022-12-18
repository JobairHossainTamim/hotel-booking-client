import React, { useState } from 'react';
import './Registration.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Loader from './../../Components/Messages/Loader/Loader';
import Error from './../../Components/Messages/Error/Error';
import Success from './../../Components/Messages/Success/Success';

const Registration = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const formik = useFormik({

        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().max(30, "User name Must be at least 30 characters").required("User name must be Required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(6, "Enter Password Must be 6 character").max(30, "User name Must be at least 20 characters").required("Password Must be Required"),
            confirmPassword: Yup.string().required('Please retype your password.').oneOf([Yup.ref('password')], 'Your passwords do not match.')

        }),
        onSubmit: async (values) => {

            try {
                setLoading(true)


                const user = {
                    name: values.username,
                    email: values.email,
                    password: values.password
                }
                const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, user).data

                setLoading(false);
                setSuccess(true);
                window.location.href="/login";


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
                        <h1 className='reg-header'>Register</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <input type="text" className="form-control" placeholder='Enter Your Name' name="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />
                            {formik.touched.username && formik.errors.username && <p style={{ color: "red" }}>{formik.errors.username}</p>}
                            <input type="text" className="form-control" placeholder='Enter Your Email' name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
                            <input type="text" className="form-control" placeholder='Enter Your Password' name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}
                            <input type="text" className="form-control" placeholder='Confirm Password' name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>}
                            <button className='btn btn-primary mt-3' type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;