import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function EditUserInfo({user, setUser}) {
    // console.log(user)
  const nav = useNavigate();
  const [userinfo, setUserinfo]=useState({})

  useEffect(()=>{
    if (user===undefined){
      return nav('/')
    }
  
    fetch(`/api/updateuser/${user}`)
    .then(res=>res.json())
    .then(data=>setUserinfo(data))
  },[])

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
      try {
      setUser(data[0]['id']);
      setSubmitting(false);
      nav('/search');
      }
      catch{
        alert('Something went wrong.')
      }
    })
      .catch((error) => console.log(error));
  }


  console.log(user)

  return(
    <div>
        <div style={{marginLeft:'0px'}}>
          <div className="w3-sidebar w3-bar-block w3-white" style={{zIndex:"3","width":"250px"}}>
              <h2 className="w3-container w3-display-container w3-padding-16g">Re_Treat</h2>
              <button className='w3-bar-item w3-button'  onClick={e=>nav('/search')}>View Available Pets</button>
              <button className='w3-bar-item w3-button'  onClick={e=>nav('/pets')}>View Favorited Pets</button>
              <button className='w3-bar-item w3-button' onClick={e=>handleLogOut(e)}>Logout</button>
          </div>
        </div>
        <div className="w3-display-container w3-container" style={{marginLeft:'250px'}}>
          <h1>Edit User Information</h1>
              <Formik
                  initialValues={{ type:'', company_name: '', email: '', password:'' }}
                  // validate={values => {
                  // const errors = {};
                  // return errors;
                  // }}
                  onSubmit={handleSubmit}
                  style={{marginLeft:'0px', alignItems:'left' }}
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
    </div>
  )
}

export default EditUserInfo