import React, { StrictMode } from 'react';
import { useEffect, useState } from 'react';
import no_image from "../images/no_image.jpg";
import { useNavigate } from "react-router-dom";


function Search({user, setUser})
{

    ///////////////////////////////////////////
    // The usersSavedPets state is being held 
    // here and in SavedPetsView. Should be 
    // refactored to have it at the App level
    ///////////////////////////////////////////
    const nav=useNavigate();
    const [searchedPets, setSearchedPets]=useState([])
    const [usersSavedPets, setUsersSavedPets]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    const [clicked, setClicked] =useState(false)
    const [pet, setPet]=useState('')


    useEffect(()=>
    {
        fetch("/api/petfinder_api_call")
        .then(res=>res.json())
        .then(data=>{
            setIsLoaded(true)
            setSearchedPets(data)
        })
        .catch(error=>console.log(error))

        fetch("/api/saved_pets")
        .then(res=>res.json())
        .then(data=>{
            if (data)
            {
                setUsersSavedPets(data)
            }
            else{
                alert("WTF!!")
            }
        })
    },[])


    function getDogPic(p)
    {
        try {
            return (p.photos[0].medium)
        }
        catch {
            return no_image
        }
    }

    function handleSavedPet(p){

        let newPet=
        {
            name:p.name, 
            breed:p.breeds.primary,
            gender:p.gender, 
            organization_id:p.organization_id,
            species:p.species, 
            photo:getDogPic(p),
            petfinder_id:p.id
        }
        fetch(`/api/saved_pets`,
        {
            method: 'POST',
            headers: 
            {
                "Content-Type":'application/json',
                "Accepts":"application/json"
            },
            body: JSON.stringify(newPet)
        })
        .then(res=>res.json())
        .then(data=>
            {
                if (data)
                    setUsersSavedPets([...usersSavedPets, data])
            })
    }

    function checkIfAlreadySaved(p)
    {
        if (usersSavedPets.length!==0){
            let ids=[]
            usersSavedPets.forEach(pet=>ids.push(pet.petfinder_id))
            if (ids.includes(p.id)){
                return true
            }
        }
    }


    function handleLogOut(e){
        fetch('/api/logout',
        {
            method: 'POST',
            headers: 
            {
                "Content-Type":'application/json',
                "Accepts":"application/json"
            }
        })
        .then(res=>res.json())
        .then(()=>console.log("loggedout"))
        .then(()=>nav('/'))
    }



    return (

        <div style={{marginLeft:'0px'}}>
            <div className="w3-sidebar w3-bar-block w3-white" style={{zIndex:"3","width":"250px"}}>
                <h2 className="w3-container w3-display-container w3-padding-16g">Re_Treat</h2>
                <button className='w3-bar-item w3-button'  onClick={e=>nav('/pets')}>View Favorited Pets</button>
                <button className='w3-bar-item w3-button' onClick={e=>handleLogOut(e)}>Logout</button>
                {/* also when we route here to edituserinfo, we need to pass user id from sessions*/}
                <button className='w3-bar-item w3-button' onClick={e=>nav('/edituserinfo')}>Edit User Information</button>
            </div>
            {isLoaded?
                <div className="w3-display-container w3-container" style={{marginLeft:'250px', display:'flex', flexWrap:'wrap'}}>
                    {searchedPets.animals.map(p=>
                    <div style={{minWidth:'300px', borderRadius:"3%"}} key={p.id}>
                        <h3>{p.name}</h3>
                        <img style ={{maxHeight:'225px', maxWidth:'300px', borderRadius:"3%", margin:'auto'}} onClick={e=>{setPet(p.name);setClicked(!clicked)}} src={getDogPic(p)}/><br/>
                        {
                            checkIfAlreadySaved(p) ?
                            <button className='w3-bar-item w3-button' onClick={e=>alert("Please go to saved pets page to view me!")}>Favorited Already</button>:
                            <button className='w3-bar-item w3-button' onClick={e=>handleSavedPet(p)}>Favorite me!</button>
                        }
                        <br/>
                        <br/>
                        {pet==p.name ? 
                            <div id="myModal" className={clicked?"model-display":"modal-hidden"}>
                                <div className="modal-content">
                                    <span className="close">&times;</span>
                                    <p>{p.name}</p>
                                </div>
                            </div>
                        :
                        null}
                    </div>
                    )}
                </div>
                :
                <h1>Loading...</h1>
            }
        </div>
    )

}

export default Search