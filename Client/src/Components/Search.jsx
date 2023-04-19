import React from 'react';
import { useEffect, useState } from 'react';
import no_image from "../images/no_image.jpg";
import { useNavigate } from "react-router-dom";


function Search()
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

    useEffect(()=>
    {
        fetch("http://127.0.0.1:8000/petfinder_api_call")
        .then(res=>res.json())
        .then(data=>{
            setIsLoaded(true)
            setSearchedPets(data)
        })
        .catch(error=>console.log(error))

        fetch("http://127.0.0.1:8000/saved_pets")
        .then(res=>res.json())
        .then(data=>setUsersSavedPets(data))
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
        fetch(`http://127.0.0.1:8000/saved_pets`,
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
        let ids=[]
        usersSavedPets.forEach(pet=>ids.push(pet.petfinder_id))
        if (ids.includes(p.id)){
            return true
        }
    }

    function handleLogOut(e){
<<<<<<< HEAD

=======
        fetch('http://127.0.0.1:8000/logout',
        {
            method: 'DELETE',
            headers: 
            {
                "Content-Type":'application/json',
                "Accepts":"application/json"
            }
        })
        .then(res=>res.json())
        .then(()=>console.log("loggedout"))
        .then(()=>nav('/'))
>>>>>>> sarah
    }

    return (
        <>
        <div>Hi put user here it is going to be tougher than i thought</div>
            <button onClick={e=>nav('/pets')}>View Favorited Pets</button>
            <button onClick={e=>handleLogOut(e)}>Logout</button>
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