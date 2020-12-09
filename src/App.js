import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header'
import Slider from './Slider'
import Product from './Product'
import {AddStateProvider} from './AddStateProvider'
import ShowProduct from './ShowProduct'
import Checkout from './Checkout'
import 'materialize-css/dist/css/materialize.min.css'
import Login from './Login';
import Order from './Order'



function App() {

  return (
    <>
      <AddStateProvider>
        <BrowserRouter>
          <div  style={{position:"sticky",top:"0px",zIndex:"1500"}}>
            <Header />
          </div>
          <Route exact path="/" >
            <Slider />
            <Product />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/product/:id">
            <ShowProduct />
          </Route>
        </BrowserRouter>
      </AddStateProvider>
    </>
  )
}

export default App
