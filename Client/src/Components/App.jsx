import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';



import '../Styling/App.css'
import SavedPetsView from './SavedPetsView';

function App() {
  //const [count, setCount] = useState(0)
  const [user, setUser]=useState(undefined)

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login user={user} setUser={setUser}/>}/>
        <Route exact path = '/signup' element ={<Signup user={user} setUser={setUser}/>}/>
        <Route exact path='/search' element={<Search user={user} setUser={setUser}/>}/>
        <Route exact path='/pets' element={<SavedPetsView user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  )
}

export default App