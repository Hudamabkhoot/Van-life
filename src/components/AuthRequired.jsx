import React, { useContext } from "react";
import { AuthContext } from './AuthContext'
import { Outlet, Navigate, useLocation} from "react-router-dom";

export default function AuthRequired() {
  const { authUser } = useContext(AuthContext);
    const location = useLocation();
    
    if (!authUser) {
        return <Navigate 
                 to='/login' 
                 state={{ message: "You must login first.", from: location.pathname }}
                 replace 
               />;
    }


 return <Outlet/>
}
