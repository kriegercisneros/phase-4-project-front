import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';
import EditUserInfo from './EditUserInfo'
import CrashableButton from './ErrorButton'



import '../Styling/App.css'
import SavedPetsView from './SavedPetsView';

function App() {

  const [user, setUser]=useState(undefined)
  const [type, setType]=useState(undefined)

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login user={user} setUser={setUser} type={type} setType={setType}/>}/>
        <Route exact path = '/signup' element ={<Signup user={user} setUser={setUser} type={type} setType={setType}/>}/>
        <Route exact path='/search' element={<Search user={user} setUser={setUser}/>}/>
        <Route exact path='/pets' element={<SavedPetsView user={user} setUser={setUser}/>}/>
        <Route exact path='/edituserinfo' element={<EditUserInfo user={user} setUser={setUser}/>}/>
        <Route exact path='/errorbutton' element={<CrashableButton/>}/>
      </Routes>
    </div>
  )
}
export default App