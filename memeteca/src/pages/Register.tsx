import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import {useHistory} from "react-router-dom"
import * as Yup from 'yup';
import axios from "axios"
import '../assets/style/Form.css'

export default function Register() {
    const [error, setError] = useState()
    let history = useHistory()

    /* What do we do after submitting the form */ 
    const handleRegister = async ({firstName, lastName, email, password}: any, actions: any) => {
        actions.setSubmitting(true)
        var url = "http://localhost:4000/register"
        try {
            const registerData = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' },
                credentials: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                 }
           
            })
            registerData? actions.setSubmitting(false): " "
            console.log(registerData.status)
            history.push("/")
           

        } catch (error) {

            if (error.response) {
                //alert(JSON.stringify(error.response.data.message))
                console.log(JSON.stringify(error.response.data))
                setError(error.response.data.message)
            }
            //actions.resetForm()
        }
     
    }

    /*  Initialize our initial state data for formik*/
    const userData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    /* A serie of conditions that Yup can accomplish easily */
    const validateDate = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')})

    return (
    <div className="container-form">
        <h1 className="title">New memetequero! 😎 </h1>
        <Formik initialValues={userData} validationSchema={validateDate} onSubmit={handleRegister} render={ ({errors, status, touched}) => (
    
            <Form className="form-auth">

            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}  />
                
                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />

                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                {error?<p className="invalid-feedback" >{error}</p> : ""}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>

            <div className="action-group-form">
            <button type="submit" className="btn-form">Register</button>
            <button type="reset" className="btn-form opaque" >Reset</button>
            </div>  
        </Form>
        ) }>

        </Formik>
    </div>
    )
}