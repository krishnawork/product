import React,{useContext, useState,useEffect} from 'react'
import './header.css';
import {CartItem} from './AddStateProvider'
import { Link,useHistory } from 'react-router-dom';
import { auth } from './firebase';


function Header() {
    let history=useHistory()
    const [Cart, setCart] = useContext(CartItem)
    const [user, setuser] = useState(false)
    useEffect(() => {
            auth.onAuthStateChanged(user=>{
                if(user){
                    setuser(true)
                }
            })
    }, [])
    return (
        <div className="header-main row">
            <div className="col s4 l3 logo">
                <Link to="/">
                <p className=""> Your Company </p>
                </Link>
            </div>
            <div className="col s5 search hide-on-small-only">
                <input type="search"  placeholder="Search Item"/>
             </div>
            <div className="col s8 l4 header-item"> 
                <div className="section1 col s8 l4">
                    {user?<button className="btn white " onClick={()=>{
                        auth.signOut()
                        window.location="/"
                    }}>Log out</button>
                    :<button className="btn white " onClick={()=>{
                        history.push('/login')
                    }}>Loging</button>}
                </div>
                <div className="section2 col s4 l8">
                <Link to ="/checkout">
                <i className="large material-icons">add_shopping_cart</i>
                <i style={{fontSize:"15px"}}>{Cart.length>0?Cart.length:""}</i>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
