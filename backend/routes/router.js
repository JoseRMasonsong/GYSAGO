const express = require('express')
const router = express.Router()

router.post('/sign-up', (req, res) => {
    console.log("Sign Up Post reached")
    console.log(req.body.password)
    //res.json(req.body)
    //const {firstName, lastName, email, password, cpassword} = req.body
    //console.log(`Variables received: ` + firstName + " | " + lastName + " | " + email + " | " + password + " | " + cpassword)
    //res.send({validation: true})

    if(req.body.password == req.body.cpassword) {console.log(req.body.cpassword)}//{
        /*myDB.all(`SELECT * FROM PROFILE, ACCOUNT WHERE PROFILE.EMAIL = "${email}"`, (err, rows) => {
            if(err){
                throw err;
            }
            if(rows.length > 0){
                res.send({validation: true})
            }
            else{
                res.send({validation: false})}
                res.end()
                myDB.run(`INSERT INTO PROFILE(FIRST, LAST, EMAIL) VALUES("${firstName}","${lastName},"${email}")`, (err) => {
                    if(err){
                        throw err;
                    }else{
                        myDB.run(`INSERT INTO ACCOUNT(EMAIL, PASSWORD) VALUES("${email}","${password}")`, (err) => {
                            if(err){
                                throw err;
                            }else{
                                myDB.run(`UPDATE ACCOUNT SET PROFILE_ID = (SELECT PROFILE_ID FROM PROFILE WHERE EMAIL = "${email}")`, (err) => {
                                    if(err){
                                        throw err;
                                    }else{
                                        res.send({validation: false})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } */
})

module.exports = router