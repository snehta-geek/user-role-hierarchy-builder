import React, { useReducer } from 'react'
import { setSigninCredentials } from '../action';
import { signinReducer } from '../reducer';
import axiosInstance from '../axiosInstance'
import { Link,useNavigate  } from 'react-router-dom';



const Signin = () => {
  const initalState={
    username : '',
    password : ''
  }

  const [state, dispatch] = useReducer(signinReducer, initalState)
  const navigate  = useNavigate();

  const setLoginDetails = (e) =>{
    const {name,value}= e.target
    dispatch(setSigninCredentials(name,value))
  }
  const saveLoginDetails = async(e) =>{
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password
    }
    const loginResp = await axiosInstance.post('/api/login',payload)
    console.log("loginResp----",loginResp);
    if(loginResp?.data?.success && loginResp.data.data.user._id){
      localStorage.setItem('userId',loginResp.data.data.user._id)
      navigate('/get-reportees')
    }

  }

  console.log("signin----st--",state);
  return (
    <section class="vh-100"> 
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={saveLoginDetails}>         

          <div class="form-outline mb-4">
            <input type="text" id="username" class="form-control form-control-lg form-label" name="username"
             placeholder="User Name" style={{ border: '1px solid #dbd7d7' }} onChange={setLoginDetails}/>
               
            {/* <label class="form-label" for="form3Example3">User Name</label> */}
          </div>

          <div class="form-outline mb-3">
            <input type="password" id="password" class="form-control form-control-lg" name="password"
             placeholder="Enter password" style={{ border: '1px solid #dbd7d7' }} onChange={setLoginDetails}/> 
               
            {/* <label class="form-label" for="form3Example4">Password</label> */}
          </div>          

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to='/'
                class="link-danger">Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>
    
    <div>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-google"></i>
      </a>
      <a href="#!" class="text-white">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</section>
  )
}

export default Signin