import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';
import EditUserInfo from './EditUserInfo'



import '../Styling/App.css'
import SavedPetsView from './SavedPetsView';

function App() {
  //const [count, setCount] = useState(0)
 //this is where david has his use effect to check if a user is logged on or not
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