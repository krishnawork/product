import React, { useEffect, useState,useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import firebase from './firebase';
import {CartItem} from './AddStateProvider'
let db=firebase.firestore()
function ShowProduct() {
    let {id}=useParams()
    const [Alldata, setAlldata] = useState(null)
    const [Id, setId] = useState(null)
    const [Cart,setCart]=useContext(CartItem)
    useEffect(()=>{
        db.collection("ProductItem").doc(id).get().then(data=>{
            if(data.exists){
                setAlldata(data.data())
            }
        })
    },[])
    return (
        <>
            {Alldata?
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="row">
                            <div className="col s12" style={{height:"416px"}}>
                                <img src={Alldata.Img} alt="" style={{maxWidth:"100%",maxHeight:"416px"}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <p className="btn col s6" style={{border:"2px solid #fff"}} onClick={()=>{
                                    setCart(old=>[...old,{Img:Alldata.Img,Rs:Alldata.Rs,Title:Alldata.Title,Id:id}])
                                }}>Add Cart</p>
                                <Link to="/checkout">
                                <p className="btn col s6" style={{border:"2px solid #fff"}}>Buy Now</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <h3>{Alldata.Title}</h3>
                        <p style={{fontWeight:"800"}}>Price : {Alldata.Rs}</p>
                        <p>{Alldata.Dis}</p>
                    </div>
                </div>
            </div>
            :"Loading Show page...."}

        </>
    )
}

export default ShowProduct
