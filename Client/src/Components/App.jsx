import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';
import EditUserInfo from './EditUserInfo'



import '../Styling/App.css'
import SavedPetsView from './SavedPetsView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path = '/signup' element ={<Signup/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/pets' element={<SavedPetsView/>}/>
        <Route exact path='/edituserinfo' element={<EditUserInfo/>}/>
      </Routes>
    </div>
  )
}
export default App