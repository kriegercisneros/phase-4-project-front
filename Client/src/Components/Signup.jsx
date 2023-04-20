
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Signup ({user, setUser, type, setType}){

  const nav=useNavigate()
  return (
    <div>
      <h1>Sign up To Create a Re_Treat!</h1>
      <Formik
        initialValues={{ 
          company_name:'',
          email:'',
          location:'',
          password:'',
          shelter_id:''
      }}
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
          console.log(values)
          fetch('/api/users', {
              method: 'POST', 
              headers: {
                  'Content-Type':'application/json'
              }, 
              body: JSON.stringify(values)
          })
              .then((r)=> r.json())
            //   .then(data=>console.log(data))
              .then(data=>setUser(data[0]['id']))
          // console.log(JSON.stringify(values, null, 2));
              .then(setSubmitting(false))
              .then(nav('/search'))
        }}
        >
        {({ isSubmitting }) => (
            <Form>
            <Field type="email" name="email" placeholder='email' />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder='Password' />
            {/* <ErrorMessage name="password" component="div" /> */}
            <Field type='textarea' name="location" placeholder="Zip Code"/>
            <Field type='textarea' name="company_name" placeholder="Company Name"/>
            <Field type='textarea' name="shelter_id" placeholder="Shelter ID"/>
            <Field type='textarea' name="type" placeholder="type"/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default Signup;