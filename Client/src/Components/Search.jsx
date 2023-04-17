import React from 'react'
import { useEffect, useState } from 'react'

function Search()
{
    const [searchedPets, setSearchedPets]=useState([])

    useEffect(()=>
    {
        fetch("http://127.0.0.1:5555/hello")
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setSearchedPets(data)
        })
        .catch(error=>console.log(error))
    },[])
    


    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Search