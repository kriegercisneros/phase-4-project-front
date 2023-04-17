import React from 'react'
import { useEffect, useState } from 'react'

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
    
    if (isLoaded===false){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    else{
        return (
            <div>
                <h1>Loaded!</h1>
            </div>
        )
    }
}

export default Search