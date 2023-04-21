import react from 'react'
import { useEffect, useState } from 'react'

function RetreatView(){

    const [retreats, setRetreats]=useState([])
console.log(retreats)
    useEffect(()=>
    {
        fetch(`/api/retreat`)
        .then(r=>r.json())
        .then(data=>setRetreats(data))
    },[])

    return (
        <div>test</div>
    )
}

export default RetreatView