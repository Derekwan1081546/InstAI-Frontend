import React from "react";
import { NavLink } from "react-router-dom";
import Mainstyle from "./MainPage.module.css";

function MainPage(){
    return(
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}> 
        <div className={Mainstyle.login}>
            <h1>Upload and Download</h1>
            <div style ={{position:'relative'}}>
                Provide the function of uploading images and downloading images
            </div>
            <span style ={{position:'relative',top:"60px",right:'80px'}}>
                <NavLink to="/Upload"> upload image</NavLink>
            </span>
            <br/>
            <span style ={{position:'relative',top:"60px",right:'80px'}}>
                <NavLink to="/Download2"> download image</NavLink>
            </span>
        </div>
        <div className={Mainstyle.login}>
            <h1> SD Components</h1>
            <div style ={{position:'relative',right:'7px'}}>Providing the finction of SD Components</div>
            <span style ={{position:'relative',top:'150px',right:'80px'}}>
                <NavLink to="/TXTtoIMG">TXT to IMG</NavLink>
            </span>
            <br/>
            <span style ={{position:'relative',top:'150px',right:'80px'}}>
                <NavLink to="/IMGtoIMG">IMG to IMG</NavLink>
            </span>
        </div>   
<div>{/*---------------------------------------------------------------------------------------------------------------------------*/}</div>
         </div>
    );
}

export default MainPage;
