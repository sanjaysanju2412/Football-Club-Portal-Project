import React, { useState, useEffect } from "react";
import './team players.css';

export function Teamplayers() {
    const [details, setDetails] = useState([]);
    const team = localStorage.getItem('team');
    let format = localStorage.getItem('format');
    useEffect(() => {
        fetch("http://localhost:130/playerGet/"+format+"/"+team)
            .then(res => res.json())
            .then(data => setDetails(data))

    }, []);

    return (
        <>
            <nav class="navbar navbar-light shadow sticky-top">
                <a class="navbar-brand">
                    <img className="img1" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/football-club-8-1047798.png" />
                </a>
                <h1 className="font-weight-bold">PLAYERS</h1>
                <form className="form-inline">
                </form>
            </nav>
            <div className="container-fluid bg-light">
                    <div className="text-center "><h3>FOOTBALL PLAYERS LIST</h3></div>
                    <table className="w-100 text-center" border={"3px dark"}>
                        <thead>
                            <th>playerId</th>
                            <th>Country Code</th>
                            <th>Player Format</th>
                            <th>Country Flag</th>
                            <th>Player Name</th>
                            <th>Rank</th>
                            <th>Player Image</th>
                            <th>Age</th>
                        </thead>
                        <tbody>
                            {details.map((value, index) => (
                                <>
                                    <tr>
                                        <td>{value.player_id}</td>
                                        <td>{value.country_code}</td>
                                        <td>{value.player_format}</td>
                                        <td className=""><img src={value.country_flag} className="col-12 col-lg-6" alt="image" /></td>
                                        <td>{value.player_name}</td>
                                        <td>{value.player_rank}</td>
                                        <td className=""><img src={value.player_image} className="col-12 col-lg-6"  alt="image" /></td>
                                        <td>{value.age}</td>
                                    </tr>
                                </>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
        </>
    );
}