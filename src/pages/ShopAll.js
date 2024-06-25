import axios from "axios"
import AllProducts from "./AllProducts.js"
import { useState, useEffect } from "react"
import "./styles/shop.css"

export default function ShopAll() {
    const [Products, setProducts] = useState([])
    const profileID = sessionStorage.getItem('token')

    const getProducts = async() => {

        await axios.post('http://localhost:4000/products', {profileID}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            let data = res.data
            console.log(data)
            setProducts(data.rows)
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className="shopAll">
                <div className="shopTitle">
                    <h1>All Products</h1>
                </div>
                <div className="products">
                    {" "}
                    {Products.map((product) => (
                        <AllProducts data={product} key={product.PRODUCT_ID}/>
                    ))}
                </div>
            </div>
        </>
    )
}