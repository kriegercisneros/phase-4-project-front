import React from 'react';
import { useEffect, useState } from 'react';
import no_image from "../images/no_image.jpg";

function Search()
{
    const [searchedPets, setSearchedPets]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)

    useEffect(()=>
    {
        fetch("http://127.0.0.1:5555/petfinder_api_call")
        .then(res=>res.json())
        .then(data=>{
            setIsLoaded(true)
            setSearchedPets(data)
        })
        .catch(error=>console.log(error))
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
            photo:getDogPic(p)
        }
        console.log(newPet)
        fetch(`http://127.0.0.1:5555/saved_pets`,
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
        .then(data=>console.log(data))
    }


    return (
        <>
            {isLoaded?
                <>
                    <h1>Loaded!</h1>
                    {searchedPets.animals.map(p=>
                    <div style={{borderColor:'black', borderStyle:'solid'}}>
                        <h3>{p.name}</h3>
                        <img src={getDogPic(p)}/><br/>
                        <button onClick={e=>handleSavedPet(p)}>Favorite me!</button>
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