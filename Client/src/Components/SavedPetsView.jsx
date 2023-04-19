import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function SavedPetsView()
{

    ///////////////////////////////////////////
    // The usersSavedPets state is being held 
    // here and in Search. Should be 
    // refactored to have it at the App level
    ///////////////////////////////////////////

    const nav=useNavigate();
    const [usersSavedPets, setUsersSavedPets]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)

    useEffect(()=>
    {
        fetch("http://127.0.0.1:8000/saved_pets")
        .then(res=>res.json())
        .then(data=>
        {
            setUsersSavedPets(data);
            setIsLoaded(true)
        })
    },[])

    function handleDelete(p)
    {
        fetch(`http://127.0.0.1:8000/saved_pets/${p.id}`,
        {
            method: 'DELETE',
            headers: 
            {
                'Content-Type':'application/json',
                'Accepts':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>
        {
            setUsersSavedPets(usersSavedPets.filter(pet=>pet.id!==p.id))
            alert(data['message'])
        })
    }

    return (
        <>
            <button onClick={e=>nav('/search')}>Click Here to View Available Pets</button>
            {
                isLoaded ? 
                <>
                {usersSavedPets.map(pet=>
                    <div key={pet.id} style={{borderColor:'black', borderStyle:'solid'}}>
                        <h3>{pet.name}</h3>
                        <img src={pet.photo}/><br/>
                        <button onClick={e=>handleDelete(pet)}>Unfavorite</button>
                    </div>
                )}
                </>
                :
                <p>loading...</p>
            }
        </>
    )
}

export default SavedPetsView;