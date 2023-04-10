import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { useLoggedStore } from '../../../globalStates/isLogged';


const ProtectedRoutes = () =>{

  const isLogged = localStorage.getItem("IsLogged")

  if (isLogged=="false"){
    return <Navigate to="/login"/>
  }

  return (
    <Outlet/>
  );
}

export default ProtectedRoutes;