import React from 'react'

import { useState , useEffect } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'

// const Basic = () => (
    

function Login({user, setUser}){
    const nav=useNavigate()
  
//////////////////////////
// UseEffect checks 
// if user is logged in 
// when the load homepage
//////////////////////////   

    useEffect(()=>
    {   
        fetch('/api/info')
        .then(r=>r.json())
        .then(data=>setUser(data['id']))
    }, [])

    if(user){
      return nav('/search')
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
                  .then((r)=>
                  {
                    console.log(r.status)
                    return r.json()
                  })  
                  .then(data=>
                    {
                      if (data[0]['id'])
                      {
                        setUser(data[0]['id'])
                      }
                      else{
                        alert("Please log in.")
                      }
                    })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" placeholder="Password" />

                <ErrorMessage name="password" component="div"/>
                <button type="submit">
                  Submit
                </button>
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