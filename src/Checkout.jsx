import React,{useContext, useEffect,useState} from 'react'
import { Link ,useHistory,Redirect} from 'react-router-dom'
import {CartItem} from './AddStateProvider'
import firebase,{ auth } from './firebase';
let db=firebase.firestore();
let prise=0;
function Checkout() {
    const [Cart,setCart]=useContext(CartItem)
    const [Prise, setPrise] = useState(null)
    const [DO, setDO] = useState(0)
    

    useEffect(()=>{
        if(Cart){
            let x=Cart.length
            prise=0
            for(let i=0;i<x;i++){
                prise+=Number(Cart[i].Rs)
            }
            
        }

    },[Cart])

    useEffect(()=>{
        setPrise(prise)
    })


    return (
        <> 
            <div className="row">
            {Cart.length>0?
               Cart.map((d,K)=>{
                   return(
                        <div class="col s12 m8">
                            <Link to={`/product/${d.Id}`}>
                            <h4 class="header">{d.Title}</h4>
                            </Link>
                        <div class="card horizontal">
                        <div class="card-image" style={{width:"200px"}}>
                            <img src={d.Img} style={{maxWidth:"100%!important"}}/>
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                            <p>{d.Dis}</p>
                            <p style={{fontWeight:"800"}}>₹  {d.Rs}</p>
                            </div>
                            <div class="card-action">
                                <button className="btn  light-blue darken-2" onClick={()=>{
                                    let datas=Cart.filter((item,k)=>{
                                        if(Cart.length==1){
                                            localStorage.removeItem("CartInLocal")
                                        }
                                        if(k==K){

                                        }else{
                                            return item
                                        }
                                    })
                                    setCart(datas)
                                }}>Remove Item</button>
                            </div>
                        </div>
                        </div>
                        </div>
                   )
               }) 
            :<>
                <h4 className="center">No item Select</h4>
                <div className="center">
                    <Link to="/" className="btn light-blue darken-2">Go To Home Page And Select Item</Link>
                </div>
            </>}
               {/* pc  */}
               <SetPrise Cart={Cart} Prise={Prise}/>
               {/* mobile */}
               <SetPriseMobile Cart={Cart} Prise={Prise} />
            </div>


        </>
    )
}
function SetPrise({Cart,Prise}){
    let history=useHistory()
    return(

        <div className="col s4 hide-on-small-only" style={{position:"fixed",right:"0px",}}>
               <div class="card blue-grey darken-1">
                    <div class="card-content white-text" >
                        <span class="card-title">PRICE DETAILS</span>
                        <hr/>
                            <p style={{fontWeight:"400",fontSize:"20px"}}>Total Item
                            <i className="right">{Cart.length? Cart.length:"0"}</i>
                            </p>                        
                            <p style={{fontWeight:"400",fontSize:"20px"}}>Total Price
                            <i className="right">{Prise?Prise:"0"}</i>
                            </p>                        
                    </div>
                    {Cart.length>0?
                    <div class="card-action">
                        <button className="btn" onClick={()=>{
                            auth.onAuthStateChanged(user=>{
                                if(user){
                                    if(user.emailVerified==true){
                                        db.collection("Order").add({
                                            Email:user.email,
                                            Itme:Cart,
                                            Time:firebase.firestore.FieldValue.serverTimestamp(),
                                        }).then(()=>{
                                            localStorage.removeItem("CartInLocal")
                                            window.location="/order";
                                            // return <Redirect to='/order'/>
                                        })
                                    }else{
                                        alert("Plz check your email id, your Id is not verify  ")
                                        auth.currentUser.sendEmailVerification().then(()=>{
                                            alert("Send Again verification code")
                                        })
                                    }
                                }else{
                                    history.push('/login')
                                }
                            })
                        }}>Buy Now</button>
                    </div>
                    :""}
                </div>
               </div>
    )
}
function SetPriseMobile({Cart,Prise}){
    let history=useHistory()
    return(

        <div className="col s12 hide-on-med-and-up" >
               <div class="card blue-grey darken-1">
                    <div class="card-content white-text" >
                        <span class="card-title">PRICE DETAILS</span>
                        <hr/>
                            <p style={{fontWeight:"400",fontSize:"20px"}}>Total Item
                            <i className="right">{Cart.length? Cart.length:"0"}</i>
                            </p>                        
                            <p style={{fontWeight:"400",fontSize:"20px"}}>Total Price
                            <i className="right">{Prise?Prise:"0"}</i>
                            </p>                        
                    </div>
                    {Cart.length>0?
                    <div class="card-action">
                        <button className="btn" onClick={()=>{
                            auth.onAuthStateChanged(user=>{
                                if(user){
                                    if(user.emailVerified==true){
                                        db.collection("Order").add({
                                            Email:user.email,
                                            Itme:Cart,
                                            Time:firebase.firestore.FieldValue.serverTimestamp(),
                                        }).then(()=>{
                                            localStorage.removeItem("CartInLocal")
                                            window.location="/order";
                                            // return <Redirect to='/order'/>
                                        })
                                    }else{
                                        alert("Plz check your email id, your Id is not verify  ")
                                        auth.currentUser.sendEmailVerification().then(()=>{
                                            alert("Send Again verification code")
                                        })
                                    }
                                }else{
                                    history.push('/login')
                                }
                            })
                        }}>Buy Now</button>
                    </div>
                    :""}
                    
                </div>
               </div>
    )
}
export default Checkout
