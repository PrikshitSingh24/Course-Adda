
import './App.css';
import AdminFunc from './Admin/admin';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route,Routes,useNavigate} from "react-router-dom";
import Dashboard from './courses/courses';
import UserFunc from './User/user';


function MainScreen(){
  
    const navigate=useNavigate();
    const navigateToAdmin=()=>{
      navigate("/admin");
    };
    const navigateToUser=()=>{
      navigate("/user");
    }
  
  return(
    <>
    <div class="background">
      <div class="plate">
        <div class="titleDiv">
        <h1 class="titleText">Course Adda</h1>
        </div>
        <div class="buttonDiv">
          <button class="userBtn" onClick={navigateToUser}>User</button>
          <button class="adminBtn" onClick={navigateToAdmin}>Admin</button>
        </div>
      </div>
    </div>
    </>
  );
}

function App(){
  return(
    <Router>
      <Routes>
         <Route exact path='/' element={<MainScreen/>}/>
        <Route path='/admin' element={<AdminFunc/>}/>
        <Route path='*' element={<AdminFunc/>}/>
        <Route path='/User' element={<UserFunc/>}/>
        <Route path='*' element={<UserFunc/>}/>
        </Routes>
    </Router>
  );
}



export default App;