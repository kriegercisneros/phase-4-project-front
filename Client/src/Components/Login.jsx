import React from 'react'

import { useState , useEffect } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'

// const Basic = () => (
    

function Login({user, setUser, type, setType}){
    const nav=useNavigate()
    console.log(user)
    console.log
    console.log(type)
//////////////////////////
// UseEffect checks 
// if user is logged in 
// when the load homepage
//////////////////////////   

    useEffect(()=>
    {   
        fetch('/api/info')
        .then(r=>r.json())
        .then(data=>
            {console.log(data)
            setUser(data['id']),
            setType(data['type'])}
            )

    }, [])
//i wrote this to login based upon type of user, so now it will not automatically reroute if a user is logged in 
    if(user){
        if(type == 'user'){return nav('/search')}
        else if(type =='admin'){return nav('/approve')}
    }

    return(
        <div>
            <h1>Welcome to Re_Treat!</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
            fetch('/api/login', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify(values)
            })
                .then((r)=>{
                    console.log(r.status)
                    return r.json()

                })  
                .then(data=>{
                    try{
                        setUser(data[0]['id'])
                        setType(data[0]['type'])}
                    catch{
                        alert("Please log in.")}
                })
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div"/>
                    <button type="submit">Submit</button>
                </Form>
            )}
            </Formik>
        <br/>
        <h3>Don't have an account?</h3>
        <button onClick={e=>nav('/signup')}>Signup</button>
        <br/><br/>
        <h3>Or try us for free!</h3>
        <button onClick={e=>alert("We'll add functionality later :)")}>Guest</button>
    </div>
    );
}
export default Login;