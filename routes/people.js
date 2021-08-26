const express = require('express')
const router = express.Router()
const mySqlConnection = require('../connection')

router.get('/', (req, res) => {
    mySqlConnection.query("SELECT * FROM people", (err, rows, fields) => {
        if (!err) {
                          
            try {
                if(rows) {
                    res.json(rows)
                }
            } catch (error) {
                res.send("error happend")
            }   
           
        }
        else {
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
    mySqlConnection.query("SELECT * FROM people WHERE ID = ?", [req.params.id], (err, rows, fields) => {
        if (!err) {
            try {
                let data =
                    `<div style="text-align: center;">
               <div>
                   <nav>
                       <h1>${rows[0].name} </h1>
                   </nav>
                   <h3>${rows[0].country}</h3>
                   <p><em> ${rows[0].age} </em></p> 
               </div>

                <h3>*****************************</h3>
                <div class="main-form" style="text-align:center">
                <form class="form" action="/edit/${req.params.id}" method="post">
                    <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" name="name" id="username" value=${rows[0].name}>
                        </div>
                    <div class="form-group">
                        <label for="country">country</label>
                        <input type="text" value=${rows[0].country} name="country" id="country"/>
                    </div>
                        <div class="form-group">
                            <label for="age">age</label>
                            <input type="number"  name="age" id="age" value=${rows[0].age}>
                        </div>
                        <div class="form-group">                
                            <button type="submit">CHange data!</button>
                        </div>
                </form>
             </div>
                <h3>*****************************</h3>

               <div>
                   <form action="/delete/${req.params.id}" method="POST">
                       <button type="submit">delete</button>
                   </form>
       
               </div>
       
                 </div>`
                res.send(data)
            } catch (error) {
                res.json("Error : " + error)
            }

        }
        else {
            res.send("err happend")
        }
    })
})


router.get('/people/add', (req, res) => {
    let form =
        `<div class="main-form" style="text-align:center">
        <form class="form" action="/add" method="post">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" value="" name="name" id="username"/>
            </div>
            <div class="form-group">
                <label for="country">country</label>
                <input type="text" value="" name="country" id="country"/>
            </div>
            <div class="form-group">
                <label for="age">age</label>
                <input type="number" value="" name="age" id="age"/>
            </div>
            <div class="form-group">                
                <button type="submit">register me!</button>
            </div>
        </form>
     </div>`
    res.send(form)
})


router.post('/add', (req, res) => {
    try {
        console.log(req.body)
        const userDetails=req.body;
        let sql = 'INSERT INTO people SET ?';
        mySqlConnection.query(sql, userDetails, function (err, data) {
            if (err) throw err;
            res.send("User data is inserted successfully ");
        });
    } catch (error) {
        res.send("err happend")
    }

})

router.post('/delete/:id', (req, res) => {
    mySqlConnection.query("DELETE  FROM people WHERE ID = ?", [req.params.id], (err, rows, fields) => {
        try {
            if (!err) {
                res.redirect("/")
                
            }
            else {
                res.send("Error occued")
            }
        } catch (error) {
            res.send("Error occued")
        }
       
    })
})
router.post('/edit/:id', (req, res) => {
    mySqlConnection.query("UPDATE people SET ? WHERE ID = ?", [req.body,req.params.id], (err, rows, fields) => {
        if (!err) {
           res.send('file updated')
        }
        else {
            console.log(err)
        }
    })
})
router.get('*' ,(req,res) => {
    res.send("Page not found")
})

module.exports = router