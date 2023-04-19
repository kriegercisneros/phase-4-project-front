import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Search from './Search';
import Signup from './Signup';



import '../Styling/App.css'
import SavedPetsView from './SavedPetsView';

function App() {
  //const [count, setCount] = useState(0)
  const [loggedIn,setLoggedIn]=useState(false)
  
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/checklogin')
    .then((r)=>r.json())
    .then(data=>console.log(data))
  },[])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path = '/signup' element ={<Signup/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/pets' element={<SavedPetsView/>}/>
      </Routes>
    </div>
  )
}

export default App