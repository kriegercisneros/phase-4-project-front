import React from 'react'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'

// const Basic = () => (
    
function Basic(){
    const nav=useNavigate()

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
              
              fetch('http://127.0.0.1:8000/checklogin')
                  .then((r)=>r.json())
                  .then(setSubmitting(false))

           fetch('http://127.0.0.1:8000/login', {
                  method:'POST',
                  headers: {
                      'Content-Type':'application/json'
                  }, 
                  body: JSON.stringify(values)
              })
                  .then((r)=>r.json())
                  .then(()=>nav('/search'))
              // console.log(JSON.stringify(values, null, 2));
                  .then(setSubmitting(false))
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" placeholder='Email' />
                <ErrorMessage name="email" component="div"/>
                <Field type="password" name="password" placeholder="Password"/>
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
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
          <button onClick={e=>nav('/search')}>Guest</button>
        </div>
      );
}

export default Basic;