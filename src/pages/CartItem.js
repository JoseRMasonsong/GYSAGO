import React from "react"
import axios from "axios"
import { Plus, Minus, Trash } from "phosphor-react";


export default function CartItem(props) {
    const {PRODUCT_ID, NAME, PRICE, QTY, SUBTOTAL} = props.data
    const profileID = sessionStorage.getItem('token')

    const reduceQTY = async() => {
        const product_id = PRODUCT_ID
    
        await axios.post('http://localhost:4000/update-cart-reduce', {profileID, product_id}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if(res.data.validation){
            window.location.reload()
            //alert('Item reduced in Cart.')
          }else{
            alert('Failed reduced in Cart.')
          }
        })
    }

    const increaseQTY = async() => {
        const product_id = PRODUCT_ID
    
        await axios.post('http://localhost:4000/update-cart-increase', {profileID, product_id}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if(res.data.validation){
            window.location.reload()
            //alert('Item increase in Cart.')
          }else{
            alert('Failed increase in Cart.')
          }
        })
    }

    const DeleteQTY = async() => {
        const product_id = PRODUCT_ID
    
        await axios.post('http://localhost:4000/update-cart-delete', {profileID, product_id}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if(res.data.validation){
            window.location.reload()
            //alert('Item increase in Cart.')
          }else{
            alert('Failed increase in Cart.')
          }
        })
    }
    
    const handleSubmitM = (e) => {
        e.preventDefault()

        if(QTY > 1){
            reduceQTY()
        }
    }

    const handleSubmitP = (e) => {
        e.preventDefault()

        if(QTY > 1){
            increaseQTY()
        }
    }

    const handleSubmitD = (e) => {
        e.preventDefault()

        DeleteQTY()
    }

    return (
        
        <div className="cartItem">
            <div className="cartItemImgFrame">
                <img src={require(`../assets/${PRODUCT_ID}.jpg`)}  alt={NAME}/>
                </div>
            <div className="name">
                <p>
                    <b>{NAME}</b>
                </p>
                <div className="countHandler">
                    <button onClick={handleSubmitM}><Minus /></button>
                    <input
                    value={QTY}
                    />
                    <button onClick={handleSubmitP}><Plus /></button>
                    <button onClick={handleSubmitD}><Trash /></button>
                </div>
                <p>Price: ${PRICE}</p>
                <p>Subtotal: ${SUBTOTAL}</p>
            </div>
        </div>
    )
}