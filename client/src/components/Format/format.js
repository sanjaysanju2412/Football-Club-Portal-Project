import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './format.css';
import { useNavigate } from "react-router-dom";

function Format() {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    useEffect(() => {
        fetch("http://localhost:130/formatGet")
            .then(res => res.json())
            .then(data => setDetails(data))

    }, []);

    const Selectformat = (value) => () => {
        alert(value.format_name);
        localStorage.setItem('format', value.format_name);
        navigate('/team');
    }


    return (
        <>

            <div className="formatbg">
                
            <nav class="navbar navbar-light shadow sticky-top">
            <div className="col-lg-12 col-12 row mr-auto ml-auto">
                <div className="col-lg-4 col-4">
                <a class="navbar-brand">
                    <img className="img1" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/football-club-8-1047798.png" />
                </a>
                </div>

                <div className="col-lg-8 col-8">
                <h1 className="font-weight-bold">FOOTBALL FORMAT</h1>
                </div>
                </div>
            </nav>
            


            <div className="row mr-auto ml-auto">
                {details.map((value, index) => (
                    <>
                    <div className="card col-lg-4 col-12 cabg " style={{ width: '18rem' }} >
                        <img src={value.format_url} height="250" className="card-img-top" alt="..." />
                        <div className="card-body  bg-white">
                            <h2 className="card-title" id="teamTitle">{value.format_name}</h2>
                             <p className="card-text">{value.format_desc}</p>
                            <a href="#" className=" btn-primary p-2 btn" onClick={Selectformat(value)}>Click...</a>
                        </div>
                    </div>


                    </>
                ))}
            </div>
            </div>

        </>
    );


}

export default Format;