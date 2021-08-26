

require('dotenv').config()
const mysql  = require('mysql2')

const connection = mysql.createConnection({
    host:process.env.MYSQL_ADDON_HOST,
    user:process.env.MYSQL_ADDON_USER,
    password:process.env.MYSQL_ADDON_PASSWORD,
    database :process.env.MYSQL_ADDON_DB,
    multipleStatements:true
})
try {
    connection.connect(function(err) {
        if(err) {
            console.log("Database error >>> "+ err)
        } else  {
            console.log("Database is connected");
        }
    
    });
} catch (error) {
    console.log("Error : "+ error)
}




module.exports = connection