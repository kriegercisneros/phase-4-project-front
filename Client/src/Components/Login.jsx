import React from 'react'
// import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'

// const Basic = () => (
    
function Basic({styles}){
    const nav=useNavigate()

    return(
        <div>
          <h1>Hello, please login.</h1>
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
            //   fetch('http://127.0.0.1:8000/checklogin')
            //       .then((r)=>r.json())
            //       .then(setSubmitting(false))
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
                <label htmlFor='Email'>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      );
}

export default Basic;