import React, { useEffect } from 'react'
import './Login.css'
import firebase,{auth} from './firebase'
import { useHistory } from 'react-router-dom';

function Login() {
    let history=useHistory()
    function SingUp(){
        let username,email,pass,cpass;
        username=document.querySelector("#username").value
        email=document.querySelector("#email").value
        pass=document.querySelector("#pass").value
        cpass=document.querySelector("#cpass").value
        if(username && email && pass && cpass){
            if(pass==cpass){
                auth.createUserWithEmailAndPassword(email,pass).then(result=>{
                    auth.currentUser.sendEmailVerification().then(()=>{
                        alert("Plz verify your email id")
                    })
                }).catch(error=>{
                    alert(error.message)
                })
            }else{
                alert("password is not match")
            }
        }else{
            alert("Plz fill all field")
        }
    }
    function SingIn(){
        let email,pass;
        email=document.querySelector('#singemail').value;
        pass=document.querySelector('#singpass').value;
        if(email && pass){
            auth.signInWithEmailAndPassword(email,pass).then(result=>{
                history.goBack()
            })
        }else{
            alert("Plz file all form")
        }
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                history.push('/')
            }
        })
    },[])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col s6 sign">
                        <h2 className="center">Sign In</h2>
                        <input type="text" id="singemail" placeholder="Email Id"/>
                        <input type="password" id="singpass" placeholder="Password"/>
                        <button className="btn" onClick={SingIn}>Submit</button>
                    </div>
                    <div className="col s6 signup">
                        <h2 className="center">Sign Up</h2>
                        <input type="text" id="username" placeholder="User Name"/>
                        <input type="text" id="email" placeholder="Email Id"/>
                        <input type="password" id="pass" placeholder="Password"/>
                        <input type="password" id="cpass" placeholder="conform Password"/>
                        <button className="btn" onClick={SingUp}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
