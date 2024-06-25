import axios from "axios"
import DepProducts from "./DepProducts.js"
import DepEmpty from "./DepEmpty.js"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./styles/shop.css"

export default function Department() {
    const params = useParams()
    const [Products, setProducts] = useState([])
    const [dep, setDep] = useState('')
    const [valid, setValid] = useState('')

    const getProducts = async() => {
        const category_id = params.cat_id
        const sub_category_id = params.sub_cat_id

        await axios.post('http://localhost:4000/department', {category_id, sub_category_id}, {headers: {'Content-Type': 'application/json'}})
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

    const getDepartment = async() => {
        const category_id = params.cat_id
        const sub_category_id = params.sub_cat_id

        await axios.post('http://localhost:4000/department-name', {category_id, sub_category_id}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if(res.data.validation){
                let data = res.data
                console.log(data)
                setDep(data.rows[0].NAME)
            }else{
                setValid('false')
            }
        })
    }
    
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
        if(Products.validation = true){
            getDepartment()
        }
    }, [])

    if(valid === ''){
        return (
            <>
                <div className="shopAll">
                    <div className="shopTitle">
                        <h1>{dep}</h1>
                    </div>
                    <div className="products">
                        {Products.map((product) => (
                            <DepProducts data={product} key={product.PRODUCT_ID}/>
                        ))}
                    </div>
                </div>
            </>
        )
    }else{
        return (
            <DepEmpty />
        )
    }
}