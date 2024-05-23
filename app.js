const express = require ("express")

const app = express()
app.use(express.json())
app.use(express.static("static"))

app.listen(3000, () => {
    console.log("Serwer port 3000")
})