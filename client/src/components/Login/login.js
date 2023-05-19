import React, { useState, useEffect } from "react";
import axios from 'axios';
import './login.css';
import { useNavigate } from "react-router-dom";
export function Login() {
    const navigate=useNavigate();
    const login = (event) => {
        event.preventDefault();
        var config = { headers: { "enctype": "multipart/form-data" } };
        var username = document.getElementById("fname").value;
        var password = document.getElementById("pwt").value;
        if (username == "") {
            alert("please enter the name")
        } else if (password == "") {
            alert("please enter the password")

        } else {
         
            let user_list = {
                "email": username,
                "password": password
            }
            console.log(user_list);

           document.getElementById("fname").value="";
           document.getElementById("pwt").value="";


            axios.post("http://localhost:130/login", user_list, config)
                .then(function (res) {
                    if (res.data.status == 'error') {
                        alert('error')
                        console.log(res.data); 
                    } else if (res.data.status == 'success') {
                        alert('Login SuccessFully')
                        navigate("/Format")
                        
                        console.log(res.data);
                       
                    }
                })


        }
    
    }
    return (
        <>
        <div className="logbg">
        <div className="container mr-auto ml-auto row text-white">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 logmar p-4">
        <form action="#">
        <h2 className="text-center">LOG IN</h2>
        <div className="ml-3 mt-3">
            <label>User Mail-ID </label> <br/>
            <input className="col-lg-8" type="email" id="fname" name="fname"/><br/>
        </div>
        <div className=" ml-3 mt-3">
            <label>Password </label><br/>
            <input className="col-lg-8" type="password" name="pwt" id="pwt"/><br/>
        </div>
        <button className=" mt-3 bg-success text-white ml-5" href="#" onClick={login}>Submit</button>
        </form>
        </div>
        </div>
        </div>
        </>
    );
}
