import './App.css';
import { useEffect, useState } from "react";

function Utensils(){
  const [screen,setScreen]=useState(false);
  function onChangeScreenSignUp(){
    setScreen(true);
  };
  function onChangeScreenLogin(){
    setScreen(false);
  }
  return(
    <>
    <div class="box">
      <div class="buttonContained">
      <button class="loginButton">Login</button>
      <button class="signupButton" onClick={onChangeScreenSignUp}>Signup</button>
      </div>
      {screen?<SignupDetails function={onChangeScreenLogin}></SignupDetails>:<LoginDetails></LoginDetails>}
    </div>
    </>
  );
}

function LoginDetails(){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const handleLogin=()=>{
    fetch("http://localhost:8080/admin/login",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("signUpToken")}`,
      },
      body:JSON.stringify({username,password})
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      alert(data.message);
      localStorage.setItem("loginToken",data.token);
    })
    .catch((error)=>{
      console.error(error);
    });
  };

  const handleUsernameChange=(event)=>{
    setUsername(event.target.value)
  }
  const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
  }
  return(
    <>
    <div class="loginBox">
      <div class="row1">
      <p class="name">Username</p>
      <input type="text" name="Username" class="adminName" value={username} onChange={handleUsernameChange}/>
      </div>
      <br></br>
      <div class="row1">
      <p class="name">Password</p>
      <input type="password" name="Password" class="adminPass" value={password} onChange={handlePasswordChange}/>
      </div>
      <button class="loginApi" onClick={handleLogin}>Login</button>
    </div>
    
    </>
  );
}

function SignupDetails(props){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const handleSignup=()=>{
    fetch("http://localhost:8080/admin/signup",{
      method:"POST",
      headers:{
       "Content-type":"application/json",
      },
      body:JSON.stringify({username,password}),
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      const token=data.token;
      localStorage.setItem("signUpToken",token);
      console.log(token);
      props.function();
    })
    .catch((error)=>{
      console.error("Error: ",error);
    });
  };

  const handleUsernameChange=(event)=>{
    setUsername(event.target.value);
  };

  const handlePasswordChange=(event)=>{
    setPassword(event.target.value);
  };

  return(
    <>
    <div class="signupBox">
      <div class="row1">
      <p class="name">Username</p>
      <input type="text" name="Username" class="adminName" value={username} onChange={handleUsernameChange}/>
      </div>
      <br></br>
      <div class="row1">
      <p class="name">Password</p>
      <input type="password" name="Password" class="adminPass" value={password} onChange={handlePasswordChange}/>
      </div>
      <button class="signupApi" onClick={handleSignup}>Signup</button>
    </div>
    </>
  );
}

function App() {
  
  return (
    <>
    <div class="background">
      <div class="plate">
        <h1 class="title">Course Adda</h1>
        <Utensils/>
      </div>
    </div>
    
    </>
  );
}



export default App;
