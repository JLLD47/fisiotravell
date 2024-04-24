const { checkDB, syncModels } = require("./db/index.js")
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function dbConnect() {
    try {
        await checkDB()
        await syncModels()
    } catch (error) {
        console.log('error')
        
    }
};

const app = express()
const port = 3000
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


app.listen(port, async () => {
    try {
        await dbConnect()
        await syncModels
        console.log(`Server is listening in port ${port}`)
        
    } catch (error) {
        console.log(error)
    }
})