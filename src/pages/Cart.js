import React, { useState, useEffect } from "react"
import CartItem from "./CartItem.js"
import CartEmpty from "./CartEmpty.js"
import { Link } from 'react-router-dom'
import axios from "axios"
import "./styles/shop.css"

export default function Cart() {
  const profileID = sessionStorage.getItem('token')
  const [Products, setProducts] = useState([])
  const [valid, setValid] = useState('')
  const [subtotal, setSubtotal] = useState('')

  const getCart = async() => {

    await axios.post('http://localhost:4000/get-cart', {profileID}, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        let data = res.data
        console.log(data)
        setProducts(data.rows)
      }else{
          setValid('false')
      }
    })
  }

  const getSub = async() => {

    await axios.post('http://localhost:4000/get-cart-sub', {profileID}, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        let data = res.data
        console.log(data)
        setSubtotal(data.rows[0].SUBTOTAL)
      }else{
          setValid('false')
      }
    })
  }
  
  useEffect(() => {
    getCart()
    getSub()
    // eslint-disable-next-line
  }, [])

  if(valid === ''){
    return (
      <div className="cart">
          <div>
          <h1>Your Cart Items</h1>
          </div>
          <div className="checkout">
              <button>
                  <Link to="/shop-all" style={{color: "white"}}> Continue Shopping</Link>
              </button>
              <button>Checkout</button>
              <p style={{fontSize: "20px", paddingRight: "20px"}}> Subtotal: ${subtotal} </p>
          </div>
          <div className="cart">
          {Products.map((product) => {
              if(product.id !== 0) {
                return <CartItem data={product} />
              }
          })}
          </div>
      </div>
    )
  }else{
    return (
        <CartEmpty />
    )
}
}