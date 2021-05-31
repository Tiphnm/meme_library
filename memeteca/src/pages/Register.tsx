import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import './Register.css'

export default function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (fields: any) => {
        const url = "http://localhost:4000/register"
        await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },
            credentials: {
                username: fields.firstName,
                password: fields.lastName }
        })
    }

    /*  Initialize our initial state data for formik*/
    const userData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    /* A serie of conditios that Yup can accomplish easily */
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

    /* What do we do after submitting the form */ 
    function handleSubmit(fields: any) {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
    }

    return (
    <div className="container-register">
        <h1 className="title">New memetequero! 😎 </h1>
        <Formik initialValues={userData} validationSchema={validateDate} onSubmit={handleRegister} render={ ({errors, status, touched}) => (

            <Form className="register-form ">

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
            <button type="reset" className="btn-form opaque">Reset</button>
            </div>
        
        </Form>
        ) }>

        </Formik>
    </div>
    )
}




 
//  const validate = values => {
//    const errors = {};
 
//    if (!values.firstName) {
//      errors.firstName = 'Required';
//    } else if (values.firstName.length > 15) {
//      errors.firstName = 'Must be 15 characters or less';
//    }
 
//    if (!values.lastName) {
//      errors.lastName = 'Required';
//    } else if (values.lastName.length > 20) {
//      errors.lastName = 'Must be 20 characters or less';
//    }
 
//    if (!values.email) {
//      errors.email = 'Required';
//    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//      errors.email = 'Invalid email address';
//    }
 
//    return errors;
//  };
 
//  const SignupForm = () => {
//    const formik = useFormik({
//      initialValues: {
//        firstName: '',
//        lastName: '',
//        email: '',
//      },
//      validate,
//      onSubmit: values => {
//        alert(JSON.stringify(values, null, 2));
//      },
//    });
//    return (
//      <form onSubmit={formik.handleSubmit}>
//        <label htmlFor="firstName">First Name</label>
//        <input
//          id="firstName"
//          name="firstName"
//          type="text"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.firstName}
//        />
//        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
 
//        <label htmlFor="lastName">Last Name</label>
//        <input
//          id="lastName"
//          name="lastName"
//          type="text"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.lastName}
//        />
//        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
 
//        <label htmlFor="email">Email Address</label>
//        <input
//          id="email"
//          name="email"
//          type="email"
//          onChange={formik.handleChange}
//          onBlur={formik.handleBlur}
//          value={formik.values.email}
//        />
//        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
 
//        <button type="submit">Submit</button>
//      </form>
//    );
//  };*****/