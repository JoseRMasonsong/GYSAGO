const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const normalizePort = require("./normalizeport");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

let myDB = require('./db')

/****************************************************************************************************************************************************/

app.post('/sign-up', (req, res) => {
    console.log("Sign Up Post reached")
    let firstName = req.body.regFirstName;
    let lastName = req.body.regLastName;
    let email = req.body.regEmail;
    let password = req.body.regPassword;
    let cpassword = req.body.regCPassword;
    console.log(req.body)
    console.log(`Data: { firstName: ${firstName}, lastName: ${lastName}, email: ${email}, password: ${password}, cpassword: ${cpassword}`)

    if(password == cpassword){
        console.log(password + " | " + cpassword)
        myDB.all(`SELECT * FROM PROFILE, ACCOUNT WHERE PROFILE.EMAIL = "${email}"`, (err, rows) => {
            if(rows.length > 0 | err){
                if(err){
                    throw err;
                }else{
                    res.send({validation: false})
                }
            }
            else{
                myDB.run(`INSERT INTO PROFILE(FIRST, LAST, EMAIL) VALUES("${firstName}","${lastName}","${email}")`, (err) => {
                    if(err){
                        throw err;
                    }else{
                        myDB.run(`INSERT INTO ACCOUNT(EMAIL, PASSWORD) VALUES("${email}","${password}")`, (err) => {
                            if(err){
                                throw err;
                            }else{
                                myDB.run(`UPDATE ACCOUNT SET PROFILE_ID = (SELECT PROFILE_ID FROM PROFILE WHERE EMAIL = "${email}") WHERE EMAIL = "${email}"`, (err) => {
                                    if(err){
                                        throw err;
                                    }else{
                                        res.send({validation: true})
                                        res.end()
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

app.post('/sign-in', (req, res) => {
    console.log("Sign In Post reached")
    let email = req.body.regEmail;
    let password = req.body.regPassword;
    console.log(req.body)
    console.log(`Data: { email: ${email}, password: ${password}}`)

    myDB.all(`SELECT P.PROFILE_ID FROM PROFILE P INNER JOIN ACCOUNT A ON P.EMAIL = A.EMAIL WHERE A.EMAIL = "${email}" AND A.PASSWORD = "${password}"`, (err, rows) => {
        if(rows.length = 1){
            //res.send(rows)
            console.log(rows)
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/get-profile', (req, res) => {

    let profile_id = req.body.profileID

    myDB.all(`SELECT P.FIRST, P.LAST, P.EMAIL, IFNULL(P.PHONE, "") AS PHONE, IFNULL(P.ADDRESS, "") AS ADDRESS
                , IFNULL(P.STATE, "") AS STATE, IFNULL(P.CITY, "") AS CITY, IFNULL(P.ZIP, "") AS ZIP
                FROM PROFILE P WHERE P.PROFILE_ID = ${profile_id}`
    , (err, rows) => {
        if(rows.length = 1){
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/update-profile', (req, res) => {
    console.log("Profile Post reached")

    let profile_id = parseInt(req.body.profileID)
    let firstName = req.body.upFirstName
    let lastName = req.body.upLastName
    let email = req.body.upEmail
    let phone = req.body.upPhone
    let address = req.body.upAddress
    let state = req.body.upState
    let city = req.body.upCity
    let zip = req.body.upZip

    console.log(req.body)
    console.log(`Data: { profile_id: ${profile_id}}`)

    myDB.run(`UPDATE PROFILE SET FIRST = "${firstName}", LAST = "${lastName}", EMAIL = "${email}", PHONE = "${phone}", ADDRESS = "${address}"
            , STATE = "${state}", CITY = "${city}", ZIP = "${zip}" WHERE PROFILE_ID = ${profile_id}`
    , (err) => {
        if(err){
            res.send({validation: false})
            res.end()
        }else{
            res.send({validation: true})
            res.end()
        }
    })
})

app.post('/products', (req, res) => {

    myDB.all(`SELECT * FROM PRODUCTS`, (err, rows) => {
        if(rows.length > 0){
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/department', (req, res) => {
    //console.log("Department Post reached")

    let category_id = parseInt(req.body.category_id)
    let sub_category_id = parseInt(req.body.sub_category_id)

    //console.log(parseInt(req.body.sub_category_id))
    //console.log(`Data: { category_id: ${category_id}, sub_category_id: ${sub_category_id}}`)

    myDB.all(`SELECT * FROM PRODUCTS WHERE CATEGORY_ID = ${category_id} AND SUB_CATEGORY_ID = ${sub_category_id}`, (err, rows) => {
        if(rows.length > 0){
            //console.log(rows)
            res.send({validation: true, rows})
            res.end()
            
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/department-name', (req, res) => {
    //console.log("Department Name Post reached")

    let category_id = parseInt(req.body.category_id)
    let sub_category_id = parseInt(req.body.sub_category_id)

    //console.log(parseInt(req.body.sub_category_id))
    //console.log(`Data: { category_id: ${category_id}, sub_category_id: ${sub_category_id}}`)

    myDB.all(`SELECT DISTINCT C.NAME || ": " || S.NAME AS NAME FROM PRODUCTS P INNER JOIN CATEGORIES C ON P.CATEGORY_ID = C.CATEGORY_ID
                INNER JOIN SUB_CATEGORIES S ON P.SUB_CATEGORY_ID = S.SUB_CATEGORY_ID WHERE C.CATEGORY_ID = ${category_id} AND S.SUB_CATEGORY_ID = ${sub_category_id}`
        , (err, rows) => {
        if(rows.length > 0){
            //console.log(rows)
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/get-cart', (req, res) => {
    //console.log("Get Cart Get reached")

    let profile_id = parseInt(req.body.profileID)

    myDB.all(`SELECT C.PROFILE_ID, P.PRODUCT_ID, P.NAME, P.PRICE, C.QTY, SUM(P.PRICE * C.QTY) AS SUBTOTAL FROM PRODUCTS P 
                INNER JOIN SHOPPING_CART C ON P.PRODUCT_ID = C.PRODUCT_ID AND C.PROFILE_ID = ${profile_id} GROUP BY C.PROFILE_ID, P.NAME`
        , (err, rows) => {
        if(rows.length > 0){
            //console.log(rows)
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/get-cart-sub', (req, res) => {
    //console.log("Get Cart Get reached")

    let profile_id = parseInt(req.body.profileID)

    myDB.all(`SELECT C.PROFILE_ID, SUM(P.PRICE * C.QTY) AS SUBTOTAL FROM PRODUCTS P 
                INNER JOIN SHOPPING_CART C ON P.PRODUCT_ID = C.PRODUCT_ID AND C.PROFILE_ID = ${profile_id} GROUP BY C.PROFILE_ID`
        , (err, rows) => {
        if(rows.length > 0){
            //console.log(rows)
            res.send({validation: true, rows})
            res.end()
        }
        else{
            if(err){
                throw err;
            }else{
                res.send({validation: false})
                res.end()
            }
        }
    })
})

app.post('/add-to-cart', (req, res) => {
    //console.log("Add to Cart Post reached")

    let profile_id = parseInt(req.body.profileID)
    let product_id = req.body.product_id
    let cart_id = parseInt(req.body.profileID)

    //console.log(req.body)
    //console.log(`Data: { profile_id: ${profile_id}, product_id: ${product_id}, cart_id: ${cart_id}}`)

    myDB.run(`INSERT INTO SHOPPING_CART(CART_ID, PROFILE_ID, PRODUCT_ID) VALUES(${cart_id}, ${profile_id}, ${product_id})`, (err) => {
        if(err){
            res.send({validation: false})
            res.end()
        }else{
            res.send({validation: true})
            res.end()
        }
    })
})

app.post('/update-cart-increase', (req, res) => {
    //console.log("Add to Cart Post reached")

    let profile_id = parseInt(req.body.profileID)
    let product_id = req.body.product_id
    let cart_id = parseInt(req.body.profileID)

    //console.log(req.body)
    //console.log(`Data: { profile_id: ${profile_id}, product_id: ${product_id}, cart_id: ${cart_id}}`)

    myDB.run(`UPDATE SHOPPING_CART SET QTY = QTY + 1 WHERE CART_ID = ${cart_id} AND PROFILE_ID = ${profile_id} AND PRODUCT_ID = ${product_id}`, (err) => {
        if(err){
            res.send({validation: false})
            res.end()
        }else{
            res.send({validation: true})
            res.end()
        }
    })
})

app.post('/update-cart-reduce', (req, res) => {
    //console.log("Add to Cart Post reached")

    let profile_id = parseInt(req.body.profileID)
    let product_id = req.body.product_id
    let cart_id = parseInt(req.body.profileID)

    //console.log(req.body)
    //console.log(`Data: { profile_id: ${profile_id}, product_id: ${product_id}, cart_id: ${cart_id}}`)

    myDB.run(`UPDATE SHOPPING_CART SET QTY = QTY - 1 WHERE CART_ID = ${cart_id} AND PROFILE_ID = ${profile_id} AND PRODUCT_ID = ${product_id}`, (err) => {
        if(err){
            res.send({validation: false})
            res.end()
        }else{
            res.send({validation: true})
            res.end()
        }
    })
})

app.post('/update-cart-delete', (req, res) => {
    //console.log("Add to Cart Post reached")

    let profile_id = parseInt(req.body.profileID)
    let product_id = req.body.product_id
    let cart_id = parseInt(req.body.profileID)

    //console.log(req.body)
    //console.log(`Data: { profile_id: ${profile_id}, product_id: ${product_id}, cart_id: ${cart_id}}`)

    myDB.run(`DELETE FROM SHOPPING_CART WHERE CART_ID = ${cart_id} AND PROFILE_ID = ${profile_id} AND PRODUCT_ID = ${product_id}`, (err) => {
        if(err){
            res.send({validation: false})
            res.end()
        }else{
            res.send({validation: true})
            res.end()
        }
    })
})


/****************************************************************************************************************************************************/

const port = normalizePort(process.env.PORT || 4000)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})