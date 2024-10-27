import React, { useEffect } from "react";
import {Navigate, Outlet} from 'react-router-dom'
import AxiosClient from "../AxiosClient";
import { useStateContext } from "../Contexts/ContextProvider";


function DefaultLayout(){

    const {user,token,setUser,setToken}=useStateContext()
    if(!token){
       return <Navigate to={'/login'}/>
    }
    const onLogout = (ev) => {
        ev.preventDefault();
        AxiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        }).catch(err => {
            console.error("Logout failed:", err);
        });
    };
    useEffect(()=>{
        AxiosClient.get("/user").then(({data})=>{setUser(data)})
    },[])

    return(
        <>
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user?.name}{"  "}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                 <Outlet/>
                </main>
            </div>
           
        
        </div>
        
        </>
    )

}
export default DefaultLayout;