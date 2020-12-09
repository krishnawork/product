import React,{createContext, useState,useEffect} from 'react'

export const CartItem=createContext()

export function AddStateProvider(props) {
    const [Cart, setCart] = useState([])

    useEffect(() => {
        console.log("cart",Cart);
        if(Cart.length>0){
            localStorage.setItem("CartInLocal",JSON.stringify(Cart))
        }
    }, [Cart])

    useEffect(() => {
        console.log("Valye",Cart);
        let x=localStorage.getItem("CartInLocal");
        if(x){
            setCart(JSON.parse(x));
        }
    }, [])

    return (
        <CartItem.Provider value={[Cart,setCart]}>
            {props.children}
        </CartItem.Provider>
    )
}


