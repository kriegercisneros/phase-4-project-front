import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';


import '../Styling/App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path = '/signup' element ={<Signup/>}/>
        <Route exact path='/search' element={<Search/>}/>

      </Routes>
    </div>
  )
}

export default App