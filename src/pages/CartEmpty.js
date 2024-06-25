import React from "react"
import { Link } from 'react-router-dom'
import "./styles/shop.css"

export default function Cart() {

    return (
      <div className="cart">
          <div>
          <h1>Your Cart Items</h1>
          </div>
          <div className="checkout">
              <button>
                  <Link to="/shop-all"> Continue Shopping</Link>
              </button>
              <button>Checkout</button>
          </div>
          <div className="cart">
            Nothing to see here.
          </div>
      </div>
    )
}
