import React, { useState, useEffect } from "react";
import './team.css';
import { useNavigate } from "react-router-dom";


export function Team() {
    const navigate=useNavigate();
    const [details, setDetails] = useState([]);

    let format = localStorage.getItem('format')
    console.log(format);
     useEffect(() => {

        fetch("http://localhost:130/teamGet/"+format)

            .then(res => res.json())
            .then(data => setDetails(data))
           
    }, [])
    const Selectteam = (value) =>()=> {
        console.log(value);
        alert(value.country_code);
        localStorage.setItem('team',value.country_code);
        navigate('/team players');
    }

    return (
        <>

            <div className="teambck">
            <nav class="navbar navbar-light shadow sticky-top">
            <div className="col-lg-12 col-12 row mr-auto ml-auto">
            <div className="col-lg-4 col-4">
                <a class="navbar-brand">
                    <img className="img1" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/football-club-8-1047798.png" />
                </a>
            </div>

            <div className="col-lg-8 col-8 ">
                <h1 className="font-weight-bold ml-4">{format}</h1>
            </div>
            </div>
            </nav>

            <div className="row mr-auto ml-auto ">
                {details.map((value, index) => (
                    <>
                        <div className="card col-lg-3 col-12 tembor p-2" style={{ width: '18rem' }} >
                            <img src={value.country_url} height="250" className="card-img-top" alt="..." />
                            <div className="card-body  bg-dark text-white">
                                <h2 className="card-title" id="teamTitle">{value.country_code}</h2>
                                <h2 className="card-title" id="teamTitle">{value.country_name}</h2>
                                <p className="card-text">{value.country_desc}</p>
                                <a href="#" className=" btn-primary p-2 btn" onClick={Selectteam(value)}>Click...</a>
                            </div>
                        </div>

                    </>
                ))}
            </div>
            </div>
        </>
    );


}