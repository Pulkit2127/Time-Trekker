import classes from "./Main.module.css";
import Modal from "../UI/Modal";
import Login from "../user/Login";
import Register from "../user/Register";
import { useState } from "react";
const Main=()=>{
    const [mode,setMode]=useState(0);
    const modalHandler=()=>{
       if(mode==0|| mode==2){
        setMode(1);
       }
       else {
        setMode(0);
       }
    }
    const modalHandler2=()=>{
        if(mode==0|| mode==1){
         setMode(2);
        }
        else {
         setMode(0);
        }
     }
    var element=<div></div>;
    if (mode==1){
        element=<Modal onClose={modalHandler}><Register></Register></Modal>
    }
    else if(mode==2){
        element=<Modal onClose={modalHandler2}><Login></Login></Modal>
    }
    var main= <div className={classes.main}>
    <p className={classes.heading}>"Organize Your Life, One Task at a Time"</p>
    <button className={classes.btn} onClick={modalHandler}>Register Now</button>
    <p className={classes.text}>Already a user?</p>
    <button className={classes.btn} onClick={modalHandler2}>Login In</button></div>;
    if(mode==1||mode==2){
        main=<div>
            {element}
         <div className={classes.main}>
         <p className={classes.heading}>"Organize Your Life, One Task at a Time"</p>
         <button className={classes.btn} onClick={modalHandler}>Register Now</button>
         <p className={classes.text}>Already a user?</p>
         <button className={classes.btn} onClick={modalHandler2}>Login In</button></div>
        </div>
    }
    return <div>   
     {main}
    </div>;
}
export default Main;