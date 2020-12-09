import React, { useEffect, useState,useContext } from 'react'
import firebase from './firebase';
import {CartItem} from './AddStateProvider'
import { Link } from 'react-router-dom';

let db=firebase.firestore();

function Product() {
    const [Data, setData] = useState([])
    const [ItemId, setItemId] = useState([])

    useEffect(()=>{
        db.collection("ProductItem").get().then(result=>{
            if(!result.empty){
                result.forEach(data=>{
                    setData(old=>[...old,data.data()])
                    setItemId(old=>[...old,data.id])
                })
            }else{
                setData(404)
            }
        })
    },[])

    return (
        <div>
            <div className="row">
                {Data.length>0?
                Data.map((d,k)=>{
                    return <div className="col s12 l3" >
                                <Item data={d} id={ItemId[k]}/>
                            </div>
                    
                })
                :"Loading Product..."}
                
            </div>


            
        </div>
    )
}

function Item({data,id}){
    const [Cart,setCart]=useContext(CartItem)
    return(
        <>
        <div className="row">
            <div className="col s12" >
                <div className="card">
                    <div className="card-image" style={{width:"200px",height:"280px"}}>
                        <img src={data.Img} style={{maxWidth:"100%",maxHeight:"100%"}}/>
                        <span className="card-title light-blue-text text-darken-4" style={{fontWeight:"700"}}>₹ {data.Rs}</span>
                    </div>
                    <div className="card-content " style={{height:"100px",overflow:"auto"}}>
                        <Link to={`/product/${id}`}>
                        <p>{data.Title}</p>
                        </Link>
                    </div>
                    <div className="card-action">
                        <button className="btn" onClick={()=>{
                            
                            setCart(old=>[...old,{Img:data.Img,Rs:data.Rs,Title:data.Title,Id:id}])
                        }}>Add Cart</button>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}

export default Product
