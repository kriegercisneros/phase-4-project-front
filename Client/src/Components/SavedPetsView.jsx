import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function SavedPetsView({user, setUser})
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
        fetch("/api/saved_pets")
        .then(res=>res.json())
        .then(data=>
        {
            setUsersSavedPets(data);
            setIsLoaded(true)
        })
    },[])

    function handleDelete(p)
    {
        fetch(`/api/saved_pets/${p.id}`,
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
            <div>
                <h2 className="w3-container w3-display-container w3-padding-16">Re_Treat</h2>
                <button className='w3-bar-item w3-button' onClick={e=>nav('/search')}>Click Here to View Available Pets</button>
                <button className='w3-bar-item w3-button' onClick={e=>handleLogOut(e)}>Logout</button>
            </div>
            {
                isLoaded ? 
                <div className="w3-display-container w3-container" style={{marginLeft:'250px', display:'flex', flexWrap:'wrap'}}>
                    {usersSavedPets.map(pet=>
                        <div key={pet.id} style={{minWidth:'300px', borderRadius:"3%"}} >
                            <h3>{pet.name}</h3>
                            <img style={{maxHeight:'225px', maxWidth:'300px', borderRadius:"3%"}} src={pet.photo}/><br/>
                            <button className='w3-bar-item w3-button' onClick={e=>handleDelete(pet)}>Unfavorite</button>
                        </div>
                    )}
                </div>
                :
                <p>loading...</p>
            }
        </div>
    )
}

export default SavedPetsView;