import React from "react";
import './signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
    const signUpOperation = async(event) => {
        event.preventDefault();
        var config = {headers:{"enctype":"multipart/form-data"}};
        var first_name = document.getElementById("fname").value;
        var last_name = document.getElementById("lname").value;
        var gender = document.getElementById("gender").value;
        var dob = document.getElementById("dob").value;
        var email = document.getElementById("email").value;
        var pattern = new RegExp("([a-z]+)(@)([a-z]+)(\.)([a-z]{2,3})");
        var result = email.match(pattern);
        var phone_number = document.getElementById("phone").value;
        var pattern = new RegExp('[89][0-9]{8}')
        var result = phone_number.match(pattern);
        var password = document.getElementById("pwt").value;
        var pattern = new RegExp("[A-Za-z]+[@][0-9]");
        var result = password.match(pattern)
        var cpassword = document.getElementById("cpwt").value;

        if (first_name == "" || first_name == null) {
            alert("please fill the first name");
        } else if (last_name == "" || last_name == null) {
            alert("please fill the last name");
        } else if (gender == "" || gender == null) {
            alert("please fill the gender");
        } else if (dob == "" || dob == null) {
            alert("please fill the Date of Birth");
        } else {
            let userInfo = {
                "first_name": first_name,
                "last_name": last_name,
                "gender": gender,
                "dob": dob,
                "email": email,
                "phone_number": phone_number,
                "password": password
            }
            console.log(userInfo);
            axios.post("http://localhost:130/add", userInfo,config)
                .then((res) => {
                    console.log(res.data);
                  alert("Signup SuccessFully");
                  navigate("/login");

                
                })
                .catch((error) => {
                    console.log(error.res.data);
                })
        }
    }
    return(
        <>
    <div className="signbg">
     <div className="container row mr-auto ml-auto text-white">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 row mr-auto ml-auto mt-2">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 bor-div">

        <form onSubmit={signUpOperation}>
        <h2 className="text-white text-center">SIGN UP</h2>
        <div className="text-frst">
            <label>First Name *</label> <br/>
            <input className="col-lg-10" type="text" id="fname" name="fname"/><br/>
        </div>
        <div className="text-sec">
            <label>Last Name *</label> <br/>
            <input className="col-lg-10" type="text" id="lname" name="lname"/><br/>
        </div>
        <div className="text-thre">
            <label>Gender </label><br/>
            <input className="col-lg-10" type="text" id="gender" name="gender"/>
        </div>
        <div className="text-four">
            <label>Date of Birth </label><br/>
            <input className="col-lg-10" type="date" id="dob" name="dob"/><br/>
        </div>
        <div className="text-five">
            <label> Email *</label><br/>
            <input className="col-lg-10" type="email" id="email" name="email"/><br/>
        </div>
        <div className="text-six">
            <label>Phone Number *</label><br/>
            <input className="col-lg-10" type="number" name="phone" id="phone"/><br/>
        </div>
        <div className="text-seven">
            <label>Password *</label><br/>
            <input className="col-lg-10" type="password" name="password" id="pwt"/><br/>
        </div>
        <div className="text-eight">
            <label>Conform Password *</label><br/>
            <input className="col-lg-10" type="password" name="cpwt" id="cpwt"/><br/>
        </div>
        <input className="col-lg-5 mb-2 mt-2 bg-success text-white" type="submit" value="SUBMIT"/>
    </form>
    </div>
    <div className="col-lg-2"></div>

    </div>
    <div className="col-lg-3"></div>
    </div>
    </div>
        </>
    );
}