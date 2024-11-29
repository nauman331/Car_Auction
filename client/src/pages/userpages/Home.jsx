import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {backendURL} from "../../utils/Exports"
import {setUser} from "../../store/slices/authSlice"

const Home = () => {
  const token = useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();

  const getUserData = async() => {
    const authorizationToken = `Bearer ${token}`
    try {
      if(!token) {
        console.log("user not logged in");
        return;
      }
      const response = await fetch(`${backendURL}/user/`, {
        method: "GET",
        headers : {
          Authorization: authorizationToken,
          'Content-Type': 'application/json',
        }
      })
      const res_data = await response.json()
      console.log(res_data)
      if(response.ok) {
        dispatch(setUser({userdata: res_data}))
      } else {
        console.warn("error in getting data")
      }
    } catch (error) {
      console.log("error in fetching user data", error)
    }
  }

  useEffect(() => {
    if(token){
      getUserData();
    }
  }, [token])
  

  return (
    <div>Home</div>
  )
}

export default Home