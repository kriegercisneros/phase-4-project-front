import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function EditUserInfo({user, setUser}) {
    // console.log(user)
    const nav = useNavigate();

  function handleSubmit(values, {setSubmitting}) {
    console.log(user)
    fetch(`/api/updateuser/${user}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: values.type,
        company_name: values.company_name,
        email: values.email
        // password: values.password,
      }),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setUser(data);
    //   console.log(user)
      setSubmitting(false);
      nav('/search');
    })
      .catch((error) => console.log(error));
  }
  return(
    <div>
        <h1>Edit User Information</h1>
            <Formik
                initialValues={{ type:'', company_name: '', email: '', password:'' }}
                // validate={values => {
                // const errors = {};
                // return errors;
                // }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
              <Form>
                <div>
                <label htmlFor="type">Type</label>
                <Field type="text" name="type"/>
              </div>
              <div>
                <label htmlFor="company_name">Company Name</label>
                <Field type="text" name="company_name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              </Form>
            )}
          </Formik>
    </div>
  )
}

export default EditUserInfo