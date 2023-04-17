import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';

import '../Styling/App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App