import React from 'react'
import { useState } from 'react'

function Login(){
    
    const [count, setCount] = useState(0)

    return(
    <>
        <div>
            <p>Hello!</p>
        </div>
        <div>
            <input></input>
            <button>username</button>
            <input></input>
            <button>email</button>
        </div>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
        </div>
    </>
    )
}

export default Login
