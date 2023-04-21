import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function Approved(){
    const nav=useNavigate()
    const [usersSavedPets, setUsersSavedPets]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    const [user, setUser]=useState(undefined)
    const [petArray, setPetArray]=useState([])

    
    function handleClick(pet){
        if (petArray.includes(pet.id)){
            setPetArray(petArray.filter(p=>p!=pet.id))
        }
        else {
           setPetArray([...petArray, pet.id])
        }
    }
    console.log(petArray)

    useEffect(()=>
    {
        fetch("/api/saved_pets")
        .then(res=>res.json())
        .then(data=>
        {
            setUsersSavedPets(data);
            setUser(data[0].user_id)
            console.log(user)
            setIsLoaded(true)
        })
    },[])
    console.log(user)
    if (! user){
        return (
            <span>Loading...</span>
        )
    }
    return (
    <div>
        <h1>Create a Re-Treat!</h1>
        <Formik
        initialValues={{ 
            user_id : user,
            date:'',
            location:'',
            pArray:petArray,
            // checked:[],
            approved: false
        }}
    onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        if(length.petArray===0){
            return  alert('loading.')
        }
        fetch('/api/retreat', {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(values)
        })
            .then((r)=> r.json())
            .then(setSubmitting(false))
        }}
        >
        {({ isSubmitting }) => (
            <Form>

            <Field type="textarea" name="location" placeholder='location' />
            <Field type='textarea' name="date" placeholder="date"/>
                <div className="w3-display-container w3-container" style={{marginLeft:'250px', display:'flex', flexWrap:'wrap'}}>
                        {usersSavedPets.map(pet=>
                            <div onClick={()=>handleClick(pet)} key={pet.id} style={{minWidth:'300px', borderRadius:"3%"}} >
                                {/* <h3>{pet.name}</h3> */}
                                <img style={{maxHeight:'225px', maxWidth:'300px', borderRadius:"3%"}} src={pet.photo}/><br/>
                                <div  role="group" aria-labelledby="checkbox-group">
                                    {/* <Field type="radio" name='checked' value={petArray.includes(pet.id) ? `true` :'false'} onClick={()=>handleClick(pet)} id={pet.id} /> */}
                                    {pet.name} is {petArray.includes(pet.id) ? "is selected" : "is not selected"} 
                                </div>
                                <br/><br/>
                            </div>
                        )}
                        
                </div>
                <button type="submit" >Submit</button>
            </Form>
        )}
        </Formik>
    </div>
    )

}
export default Approved