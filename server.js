const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const peopleRoutes = require('./routes/people')
app.use('/',peopleRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})