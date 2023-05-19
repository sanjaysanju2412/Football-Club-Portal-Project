import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';


export function Landing(){
    return(
        <>

            <div className='land-div'>
            <nav class="navbar navbar-light shadow sticky-top">
            <a class="navbar-brand">
            <img className="img1"src="https://cdn.iconscout.com/icon/premium/png-256-thumb/football-club-8-1047798.png"/>
            </a>
      
            <h1 className="font-weight-bold ml-5">FOOTBALL CLUB</h1>
            <form className="form-inline">
            <Link to="/signup"><button class="btn btn-primary my-2 my-sm-0" type="submit">SignUp</button></Link>
            <Link to="/login"><button class="btn btn-success my-2 my-sm-0 ml-3" type="submit">LogIn</button></Link>
            </form>
            </nav>

         {/* <!-- carousel --> */}

         <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://wallpaperaccess.com/full/6708704.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>

            <div class="carousel-item">
                <img src="https://wallpaperaccess.com/full/1387776.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>
            <div class="carousel-item">
                <img src="https://wallpaperaccess.com/full/6977042.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>
        </div>

            <button className="carousel-control-prev raw" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next raw" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </button>
        </div>
        </div>

        </>
    );
}