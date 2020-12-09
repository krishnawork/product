import React, { useEffect, useState } from 'react'
import { useHistory,Link } from 'react-router-dom';
import firebase, { auth } from './firebase'
let db=firebase.firestore();
function Order() {
    let history=useHistory()
    const [yourOrder, setyourOrder] = useState([])
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection("Order").where("Email","==",user.email).get().then(result=>{
                    if(!result.empty){
                        result.forEach(data=>{
                            setyourOrder(old=>[...old,data.data().Itme])
                        })
                    }else{
                        
                    }
                })
            }else{
                history.push('/login')
            }
        })
    },[])
    return (
        <>
            <div className="container">
                
            {yourOrder.length>0?yourOrder.map(data=>{
                return <ShowItem data={data} />
                
            }):"loading"}
            </div>
        </>
    )
}

function ShowItem({data}){
    return(
        <>
            {data.map(d=>{
                return(
                    <div class="col s8">
                        {console.log("kya pata",d.Id)}
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
                        </div>
                    </div>
                    </div>
                    </div>
               )
            })}

        </>
    )
}
export default Order
