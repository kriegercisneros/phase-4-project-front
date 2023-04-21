import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';
import EditUserInfo from './EditUserInfo'
import CrashableButton from './ErrorButton'
import Approve from './Approve'
import Retreat from './Retreat'



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
        <Route exact path ='/approve' element={<Approve />}/>
        <Route exact path ='/retreat' element={<Retreat/>}/>
        <Route exact path='/retreat_view' element={<Retreat/>}/>
      </Routes>
    </div>
  )
}
export default App