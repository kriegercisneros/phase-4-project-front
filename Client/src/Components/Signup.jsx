
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Basic (){
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
          fetch('http://127.0.0.1:8000/users', {
              method: 'POST', 
              headers: {
                  'Content-Type':'application/json'
              }, 
              body: JSON.stringify(values)
          })
              .then((r)=> r.json())
              .then((data)=>console.log(data))
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

export default Basic;


// onSubmit={(values, { setSubmitting }) => {
//     fetch('http://127.0.0.1:8000/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(values)
//     })
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }
//         console.log(response.json());
//         alert('Data has been submitted to the database!');
//     })
//     .catch(error => {
//         console.error(error);
//         alert('An error occurred while submitting the data.');
//     })
//     .finally(() => {
//         setSubmitting(false);
//     });
// }}