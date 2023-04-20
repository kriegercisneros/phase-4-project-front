import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function EditUserInfo() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    type: '',
    company_name: '',
    email: '',
  });

  function handleSubmit(values, {setSubmitting}) {
    fetch(`/api/update_user/<int:id>`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: values.type,
        company_name: values.company_name,
        email: values.email,
        password: values.password,
      }),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setUser(data);
      setSubmitting(false);
      nav('/search');
    })
      .catch((error) => console.log(error));
  }
  return(
    <div>
        <h1>Edit User Information</h1>
            <Formik
                initialValues={{ type: user.type || '', company_name: user.company_name || '', email: user.email || '', password:'' }}
                validate={values => {
                const errors = {};
                return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
              <Form>
                <div>
                <label htmlFor="type">Type</label>
                <Field type="text" name="type" value={user ? user.type : ''}/>
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