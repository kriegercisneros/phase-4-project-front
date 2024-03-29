import { useEffect, useState } from 'react'

export default function App({Component}){
    // const [currUser, setCurrUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        fetch('/api/info')
        .then(resp=>resp.json())
        .then(data=>setLoggedIn(data.logged_in))
    }, [])

    return <Component currUser = { loggedIn }/>

}
