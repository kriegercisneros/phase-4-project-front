import React from 'react';
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
    console.log(user)
    const nav=useNavigate();
    const [searchedPets, setSearchedPets]=useState([])
    const [usersSavedPets, setUsersSavedPets]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
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
            petfinder_id:p.id,
            user_id:user
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
        .then(data=>setUsersSavedPets([...usersSavedPets, data]))
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

    console.log(usersSavedPets)

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
        <>
        <div>Hi User</div>
            <button onClick={e=>nav('/pets')}>View Favorited Pets</button>
            <button onClick={e=>handleLogOut(e)}>Logout</button>
            {/* also when we route here to edituserinfo, we need to pass user id from sessions*/}
            <button onClick={e=>nav('/edituserinfo')}>Edit User Information</button>
            {isLoaded?
                <>
                    {searchedPets.animals.map(p=>
                    <div key={p.id} style={{borderColor:'black', borderStyle:'solid'}}>
                        <h3>{p.name}</h3>
                        <img src={getDogPic(p)}/><br/>
                        {
                            checkIfAlreadySaved(p) ?
                            <button onClick={e=>alert("Please go to saved pets page to view me!")}>Favorited Already</button>:
                            <button onClick={e=>handleSavedPet(p)}>Favorite me!</button>
                        }
                    </div>
                    )}
                </>
                :
                <h1>Loading...</h1>
            }
        </>
    )

}

export default Search