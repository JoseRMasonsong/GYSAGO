import React from "react"
import axios from "axios"

export default function AllProducts(props) {
    const {PRODUCT_ID, NAME, PRICE, QTY, CATEGORY_ID, SUB_CATEGORY_ID, FILTER_ID, KEY_ID, SOLD} = props.data
    const profileID = sessionStorage.getItem('token')

    const axiosPostData = async() => {
        const product_id = PRODUCT_ID
    
        await axios.post('http://localhost:4000/add-to-cart', {profileID, product_id}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if(res.data.validation){
            alert('Item Added to Cart.')
          }else{
            alert('Failed to Add Item to Cart.')
          }
        })
    }
    
    const handleSubmit = (e) => {
    e.preventDefault()

    axiosPostData()
    }

    return (
        <div className="product">
            <img src={require(`../assets/${PRODUCT_ID}.jpg`)} alt={`./assets/${NAME}`}/>
            <div className="name">
                <p>
                    <b>{NAME}</b>
                </p>
                <p>${PRICE}</p>
                <p>{QTY}{CATEGORY_ID}{SUB_CATEGORY_ID}{FILTER_ID}{KEY_ID}{SOLD}</p>
            </div>
            <button className="addToCartBttn" onClick={handleSubmit}>Add To Cart</button>
        </div>
    )
}
